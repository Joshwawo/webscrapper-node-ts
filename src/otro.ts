import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs";
import _ from "lodash";
import ora from 'ora'
import 'dotenv/config'

type props ={
  steps: number
  creator: string
  fileName?: string
}
const spinner = ora({
  stream: process.stdout,
  spinner: "monkey",
})


async function scrapidu ({fileName = "db",creator , steps = 1}:props) {
  spinner.start('Iniciando...')
  console.log("fileName", fileName)
  if (!steps || steps < 1 || isNaN(steps) || !creator || creator == null ) {
    throw new Error("No steps provided");
  }
  const browser: Browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./userData",
  });

  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  spinner.text = "Buscando la pagina...\n";
  await page.goto(`${process.env.BASE_URL}/${creator}/photos`, {
    waitUntil: "networkidle2",
  });
  const allResultsSelector = "body";
  await page.waitForSelector(allResultsSelector);
  let imageGrid = await page.$$(".b-photos__item__img");
  const imageGridLength = imageGrid.length;
  console.log("imageGridLength", imageGridLength);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Leer el archivo JSON existente o crear un array vacío si el archivo no existe
  let existingData  = { 
    [creator]: [] as string[]
   };
  let isNew:boolean;
  if (fs.existsSync(`./db/${fileName}.json`)) {
    isNew = false;
    console.log("existe el archivo")
    spinner.text = "Leyendo el archivo existente...\n";
    const data = fs.readFileSync(`./db/${fileName}.json`, "utf-8");
    existingData = JSON.parse(data);
  }else{
    isNew = true;
    console.log("no existe el archivo, lo creo")
    spinner.text = "Creando el archivo...\n";
    fs.writeFileSync(`./db/${fileName}.json`, JSON.stringify({ creatorsList: [existingData] }, null, 2));

  }

  // Crear un conjunto a partir de los elementos existentes y nuevos para evitar duplicados
  const uniqueSet = new Set(existingData[fileName]);
  const uniqueArray = Array.from(uniqueSet);

  // Iterar sobre todas las imágenes
  const imagePath = "div.pswp__container  img";
  for (let i = 0; i < steps; i++) {
    spinner.text = `Obteniendo la imagen ${i+1} de ${steps}...\n`;
    const image = imageGrid[i];
    await image?.click();
    await page.waitForSelector(`${imagePath}`, { visible: true });
    // Obtener el src de la imagen
   try {
    const src = await page.$eval(`${imagePath}`,(img: HTMLImageElement) => img.getAttribute("src") );

    //si no encuntra el image path, entonces pasa a la siguiente imagen
    if (!src) {
      spinner.text = `No se encontró la imagen ${i+1} de ${steps}...\n`;
      console.log("No se encontró la imagen");
      await page.keyboard.press("Escape");
      imageGrid.shift();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await page.waitForSelector(".b-photos__item__img", { visible: true });
      imageGrid = await page.$$(".b-photos__item__img");
      continue;
    }

    // Verificar si el src ya está en el array
    if (uniqueSet.has(src)) {
      console.log("Imagen ya almacenada");
    } else if (uniqueArray.length === imageGridLength) {
      console.log("Ya no hay más imágenes");
      console.log("uniqueArray size", uniqueArray.length);
      break;
    } else {
      // Agregar el src al conjunto único
      uniqueSet.add(src);
      spinner.text = `Imagen ${i+1} de ${steps} almacenada...\n`;
      console.log("uniqueArray size", uniqueSet.size);
    }
    
   } catch (error) {
    console.log(error)
    console.log("No se encontró la imagen")
   }

    await page.keyboard.press("Escape");
    spinner.text = `Procesando la imagen ${i+1} de ${steps}...\n`;
    imageGrid.shift();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.waitForSelector(".b-photos__item__img", { visible: true ,timeout: 2000});
    imageGrid = await page.$$(".b-photos__item__img");
    
  }

  // Convertir el conjunto único de nuevo a un array y escribirlo en el archivo
  const uniqueArrayFinal = _.uniq(Array.from(uniqueSet));
  console.log("uniqueArrayFinal", uniqueArrayFinal.length)
  
  if (isNew){

    fs.writeFileSync(`./db/${fileName}.json`, JSON.stringify({ creatorsList: [{[creator]:uniqueArrayFinal}] }, null, 2));
    
  }else{
    fs.writeFileSync(`./db/${fileName}.json`, JSON.stringify({ creatorsList: [...existingData.creatorsList,  {[creator]:uniqueArrayFinal}] }, null, 2));
  }

  spinner.text = `Se han almacenado ${uniqueArrayFinal.length} imagenes...\n`;
  console.log("uniqueArrayFinal size", uniqueArrayFinal.length);
  spinner.succeed('Finalizado')
  spinner.stop()
  await browser.close();
  return  `creador: ${creator}, ${uniqueArrayFinal.length} imagenes almacenadas ✅`

};

export default scrapidu



