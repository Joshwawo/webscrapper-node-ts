import fs from "node:fs";
import puppeter, { Browser, Page } from "puppeteer";
import ora from "ora";
import chalk from "chalk";
const spinner = ora({
  stream: process.stdout,
  spinner: "aesthetic",
});

const scrapper = async (name: string, folder: string): Promise<void> => {
  spinner.text = "Iniciando...";
  spinner.start();

  const browser: Browser = await puppeter.launch({
    headless: false,
  });
  spinner.text = "Abiendo el navegador...\n";
  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  spinner.text = "Buscando la pagina...\n";
  await page.goto(`${name}`, {
    waitUntil: "networkidle2",
  });

  const allResultsSelector = "#main_nav_container";
  await page.waitForSelector(allResultsSelector);

  const listSelector =
    "body > div.wrapper > app-root > app-layout > search-artwork > projects-list > div > projects-list-item";
  await page.waitForSelector(listSelector);

  const links: string[] = await page.evaluate((listSelector) => {
    return [...document.querySelectorAll(listSelector)].map(
      (anchor: HTMLAnchorElement) => {
        const aTag = anchor.querySelector("a").href;

        return aTag;
      }
    );
  }, listSelector);
  console.log(chalk.blue(`Total Links encontrados ${links.length}\n`));
  fs.writeFileSync(`./outputs/artStation/imgLinks.txt`, links.join("\n"));

  // let pagePromise = (link: string): Promise<{ creator: string; img: string }> =>
  //   new Promise(async (resolve, reject) => {
  //     let dataObj = {
  //       creator: "no name",
  //       img: "",
  //     };
  //     let newPage = await browser.newPage();
  //     await newPage.goto(link);
  //     const mainSelector = "body";
  //     await newPage.waitForSelector(mainSelector);

  //     const wrapperSelector = ".wrapper";
  //     await newPage.waitForSelector(wrapperSelector);

  //     const imgSelector = "#main-nav > ul > li.main-menu-logo > a";
  //     await newPage.waitForSelector(imgSelector);

  //     const titleSelector = "body > div.wrapper ";
  //     await newPage.waitForSelector(titleSelector);
  //     const image = `div > div > picture > img`;
  //     await newPage.waitForSelector(image);
  //     const video = `#movie_player > a`;

  //     dataObj["img"] =
  //       (await newPage.$eval(image, (img) => img.src)) ||
  //       (await newPage.$eval(video, (vid) => vid.href));

  //     // dataObj["ismg"] = await newPage.$eval(image, (img) => img.src);

  //     resolve(dataObj);
  //     await newPage.close();
  //   });
  let pagePromise = (link: string): Promise<{ creator: string; img: string }> =>
  new Promise(async (resolve, reject) => {
    let dataObj = {
      creator: "no name",
      img: "",
    };
    let newPage = await browser.newPage();
    await newPage.goto(link);
    const mainSelector = "body";
    await newPage.waitForSelector(mainSelector);

    try {
      const wrapperSelector = ".wrapper";
      await newPage.waitForSelector(wrapperSelector);

      const imgSelector = "#main-nav > ul > li.main-menu-logo > a";
      await newPage.waitForSelector(imgSelector);

      const titleSelector = "body > div.wrapper ";
      await newPage.waitForSelector(titleSelector);
      const image = `div > div > picture > img`;
      await newPage.waitForSelector(image)
      const video = `#movie_player > a` || "";

      dataObj["img"] =
        (await newPage.$eval(image, (img) => img.src))
        // (await newPage.$eval(video, (vid) => vid.));
    } catch (error) {
      console.error(error);
      dataObj["img"] = "https://cdnb.artstation.com/p/assets/images/images/015/049/297/large/fabio-ilacqua-fortnite-glider-junkjat-front.jpg?1546871534";
    }

    resolve(dataObj);
    await newPage.close();
  });

  let downLoadCounter: number = 0;
  const picOp = (pic: string) => {
    return pic?.split(".")[2]?.split("/")[9];
  };

  for (let link in links) {
    let currentPageData = await pagePromise(links[link]);
    if (
      fs.existsSync(
        `./outputs/artStation/${folder}/${picOp(currentPageData.img)}.webp`
      )
    ) {
      console.log(chalk.red(`Ya existe skip\n`));
      continue;
    }
    console.log(chalk.blue(currentPageData.img + "\n"));
    downLoadCounter++;
    spinner.color = "green";
    spinner.text = `Ahora a descargar ${downLoadCounter}/${links.length} \n`;

    const response = await fetch(currentPageData.img);
    const buffer: ArrayBuffer = await response.arrayBuffer();

    fs.writeFileSync(
      `./outputs/artStation/${folder}/${picOp(currentPageData.img)}.webp`,
      Buffer.from(buffer)
    );
  }

  spinner.succeed("Ya termine we");

  await browser.close();
};
let input = "janna lol".replaceAll(" ", "%20");
let folder = "janna";
let page = `https://www.artstation.com/search?sort_by=relevance&query=${input}`;
scrapper(page, folder);

// async function twitter() {
//   const browser = await puppeter.launch({
//     headless: false,
//   });

//   //Iniciamos una nueva instancia de Puppeteer

//   // Creamos una nueva página
//   const page = await browser.newPage();
//   // Nos dirigimos a la página de inicio de sesión de Twitter
//   await page.goto('http://quotes.toscrape.com/login');

//   // Ahora, podemos usar Puppeteer para escribir nuestro nombre de usuario y contraseña en los campos de inicio de sesión

//   const username = await page.$x(`//input[@name="username"]`)
//   await username[0].type('nineteen');

//   const password = await page.$x(`//input[@name="password"]`)
//   await password[0].type('nineteen');

//   // Ahora, podemos hacer clic en el botón de inicio de sesión
//   const loginButton:any = await page.$x(`//input[@type="submit"]`)

//   await loginButton[0].click();
  


//   // Finalmente, podemos esperar a que se complete el proceso de inicio de sesión y cerrar el navegador
//   await page.waitForNavigation();
//   // await browser.close();
// }

// twitter();
