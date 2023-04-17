import fs from "node:fs";
import puppeter, { Browser, Page } from "puppeteer";
import ora from "ora";
import chalk from "chalk";
const spinner = ora({
  stream: process.stdout,
  spinner: "aesthetic",
});

// const twitter = async (name: string, folder: string): Promise<void> => {
//   spinner.text = "Iniciando...";
//   spinner.start();

//   const browser: Browser = await puppeter.launch({
//     headless: false,
//     userDataDir: "./userDataTwitter",
//   });

//   const page: Page = await browser.newPage();
//   await page.setViewport({ width: 1920, height: 1080 });
//   spinner.text = "Buscando la pagina...\n";

//   await page.goto("https://twitter.com/i/flow/login", {
//     waitUntil: "networkidle2",
//   });
//   const allResultSelector = "body";
//   await page.waitForSelector(allResultSelector);

//   spinner.text = "Esperando a iniciar de sesion\n";
//   await page.waitForNavigation({ waitUntil: "networkidle2" });
//   spinner;
//   await page.goto("https://twitter.com/Joshwawo/media", {
//     waitUntil: "networkidle2",
//   });

//   const imgSelector = "div > div > div > img";

//   await page.waitForSelector(imgSelector);
//   await scrollToBottom(page);

//   const links = await page.evaluate((imgSelector) => {
//     return [...document.querySelectorAll(imgSelector)].map(
//       (anchor: HTMLAnchorElement) => {
//         const aTag = anchor.getAttribute("src");

//         return aTag;
//       }
//     );
//   }, imgSelector);
//   console.log(links);

//   await browser.close();
//   spinner.stop();
// };
// const twitter = async (name: string, folder: string): Promise<void> => {
//   spinner.text = "Iniciando...";
//   spinner.start();

//   const browser: Browser = await puppeter.launch({
//     headless: false,
//     userDataDir: "./userDataTwitter",
//   });

//   const page: Page = await browser.newPage();
//   await page.setViewport({ width: 1920, height: 1080 });
//   spinner.text = "Buscando la pagina...\n";

//   await page.goto("https://twitter.com/BeyenePat/media", {
//     waitUntil: "networkidle2",
//   });

//   const imgSelector = "div > div > div > img";

//   await page.waitForSelector(imgSelector);
//   async function scrollToBottom(page:any) {
//     await page.evaluate(async () => {
//       await new Promise<void>((resolve, reject) => {
//         let totalHeight = 0;
//         const distance = 100;
//         const timer = setInterval(() => {
//           const scrollHeight = document.body.scrollHeight;
//           window.scrollBy(0, distance);
//           totalHeight += distance;

//           if (totalHeight >= scrollHeight) {
//             clearInterval(timer);
//             resolve();
//           }
//         }, 100);
//       });

//       // Vuelve a subir un poco para que se carguen más imágenes
//       window.scrollBy(0, -50);
//     });
//   }

//   let links: string[] = [];
//   let previousLinksLength = 0;

//   // const getLinks = async (): Promise<void> => {
//   //   // Hace el scroll y espera a que se carguen más imágenes
//   //   await scrollToBottom(page);
//   //   await  page.waitForSelector(imgSelector);
//   //   // await page.waitfor(1000);

//   //   // Recoge las imágenes
//   //   const newLinks = await page.evaluate((imgSelector) => {
//   //     return [...document.querySelectorAll(imgSelector)].map(
//   //       (anchor: HTMLAnchorElement) => {
//   //         const aTag = anchor.getAttribute("src");

//   //         return aTag;
//   //       }
//   //     );
//   //   }, imgSelector);

//   //   // Añade las nuevas imágenes al array de enlaces
//   //   links = [...links, ...newLinks];

//   //   // Si no se han añadido nuevas imágenes, sale de la función recursiva
//   //   if (previousLinksLength === links.length) {
//   //     return;
//   //   }
//   //   previousLinksLength = links.length;

//   //   // Si sí se han añadido nuevas imágenes, vuelve a llamar a la función recursivamente
//   //   getLinks();
//   // };
//   const getLinks = async (): Promise<void> => {
//     // Hace el scroll y espera a que se carguen más imágenes
//     await scrollToBottom(page);
//     await page.waitForSelector(imgSelector);

//     // Recoge las imágenes
//     const newLinks = await page.evaluate((imgSelector) => {
//       return [...document.querySelectorAll(imgSelector)].map(
//         (anchor: HTMLAnchorElement) => {
//           const aTag = anchor.getAttribute("src");

//           return aTag;
//         }
//       );
//     }, imgSelector);

//     // Añade las nuevas imágenes al array de enlaces
//     links = [...links, ...newLinks];

//     // Si no se han añadido nuevas imágenes, sale de la función recursiva
//     if (previousLinksLength === links.length) {
//       return;
//     }
//     previousLinksLength = links.length;

//     // Si sí se han añadido nuevas imágenes, vuelve a llamar a la función recursivamente
//     getLinks();
//   };

//   await getLinks();

//   console.log('los Links',links);

//   await browser.close();
//   spinner.stop();
// };

// const twitter = async (name: string, folder: string): Promise<void> => {
//   // Inicia sesión en Twitter y navega hasta el perfil del usuario
//   const browser = await puppeter.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto('https://twitter.com/login', {waitUntil: 'networkidle2'});

//   await page.waitForNavigation();
//   await page.goto('https://twitter.com/joshwawo/media');
//   await page.waitForSelector('img[src^="https://pbs.twimg.com/media/"]');

//   // Desplaza el scroll hasta el final de la página
//   await page.evaluate(() => {
//     window.scrollTo(0, document.body.scrollHeight);
//   });

//   // Espera a que se carguen más imágenes
//   await page.waitForFunction(() => {
//     // Esta función se evalúa en el contexto del navegador, por lo que puedes acceder a los elementos de la página mediante `document`.
//     const images = document.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');
//     return images.length > 0;
//   });

//   // Descarga las imágenes
//   const images = await page.evaluate(() => {
//     const imageElements = Array.from(document.querySelectorAll<HTMLImageElement>('img[src^="https://pbs.twimg.com/media/"]'));
//     return imageElements.map(img => img.src);
//   });
//   console.log(images);

//   // Cierra el navegador
//   await browser.close();
// }

// const twitter = async (name: string, folder: string): Promise<void> => {
//   // Inicia sesión en Twitter y navega hasta el perfil del usuario
//   const browser = await puppeter.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

//   await page.waitForNavigation();
//   await page.goto("https://twitter.com/joshwawo/media");
//   await page.waitForSelector('img[src^="https://pbs.twimg.com/media/"]');

//   let images: any[] = [];
//   let moreImages = true;

//   while (moreImages) {
//     // Descarga las imágenes que están actualmente en la página
//     const newImages = await page.evaluate(() => {
//       const imageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return imageElements.map((img) => img.src);
//     });

//     images = images.concat(newImages);

//     // Desplaza el scroll hacia abajo
//     await page.evaluate(() => {
//       window.scrollTo(0, document.body.scrollHeight);
//     });

//     // Espera a que se carguen más imágenes
//     //   // Espera a que se carguen más imágenes
//     await page.waitForFunction(() => {
//       // Esta función se evalúa en el contexto del navegador, por lo que puedes acceder a los elementos de la página mediante `document`.
//       const images = document.querySelectorAll(
//         'img[src^="https://pbs.twimg.com/media/"]'
//       );
//       return images.length > 0;
//     });

//     // Verifica si hay más imágenes por cargar
//     moreImages = await page.evaluate(() => {
//       const newImageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return newImageElements.length > images.length;
//     });
//   }

//   console.log(images);

//   // Cierra el navegador
//   await browser.close();
// };

// const twitter = async (name: string, folder: string): Promise<void> => {
//   // Inicia sesión en Twitter y navega hasta el perfil del usuario
//   const browser = await puppeter.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

//   await page.waitForNavigation();
//   await page.goto("https://twitter.com/joshwawo/media");
//   await page.waitForSelector('img[src^="https://pbs.twimg.com/media/"]');

//   await page.evaluate(() => {
//     (window as any).images = [];
//   });

//   let moreImages = true;

//   while (moreImages) {
//     // Descarga las imágenes que están actualmente en la página
//     const newImages = await page.evaluate(() => {
//       const imageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return imageElements.map((img) => img.src);
//     });

//     await page.evaluate(newImages => {
//       (window as any).images = (window as any).images.concat(newImages);
//     }, newImages);

//     // Desplaza el scroll hacia abajo
//     await page.evaluate(() => {
//       window.scrollTo(0, document.body.scrollHeight);
//     });

//     // Espera a que se carguen más imágenes
//       await page.waitForFunction(() => {
//     // Esta función se evalúa en el contexto del navegador, por lo que puedes acceder a los elementos de la página mediante `document`.
//     const images = document.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');
//     return images.length > 0;
//   });

//     // Verifica si hay más imágenes por cargar
//     moreImages = await page.evaluate(() => {
//       const newImageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return newImageElements.length > (window as any).images.length;
//     });
//   }

//   console.log(await page.evaluate(() => (window as any).images));

//   // Cierra el navegador
//   await browser.close();
// };

// const twitter = async (name: string, folder: string): Promise<void> => {
//   // Inicia sesión en Twitter y navega hasta el perfil del usuario
//   const browser = await puppeter.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

//   await page.waitForNavigation();
//   await page.goto("https://twitter.com/joshwawo/media");
//   await page.waitForSelector('img[src^="https://pbs.twimg.com/media/"]');

//   await page.evaluate(() => {
//     (window as any).images = [];
//   });

//   let moreImages = true;

//   while (moreImages) {
//     // Descarga las imágenes que están actualmente en la página
//     const newImages = await page.evaluate(() => {
//       const imageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return imageElements.map((img) => img.src);
//     });

//     await page.evaluate(newImages => {
//       (window as any).images = (window as any).images.concat(newImages);
//     }, newImages);

//     // Calcula la distancia que debes desplazar el scroll para alcanzar el final del documento
//     const { innerHeight, scrollHeight } = window;
//     const distance = scrollHeight - innerHeight;

//     // Desplaza el scroll hacia abajo
//     window.scrollBy(0, distance);

//     // Espera a que se carguen más imágenes
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     // Verifica si hay más imágenes por cargar
//     moreImages = await page.evaluate(() => {
//       const newImageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return newImageElements.length > (window as any).images.length;
//     });
//   }

//   console.log(await page.evaluate(() => (window as any).images));

//   // Cierra el navegador
//   await browser.close();
// };

// const twitter = async (name: string, folder: string): Promise<void> => {
//   // Inicia sesión en Twitter y navega hasta el perfil del usuario
//   const browser = await puppeter.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

//   await page.waitForNavigation();
//   await page.goto("https://twitter.com/joshwawo/media");
//   await page.waitForSelector('img[src^="https://pbs.twimg.com/media/"]');

//   await page.evaluate(() => {
//     (window as any).images = [];
//   });

//   let moreImages = true;

//   while (moreImages) {
//     // Descarga las imágenes que están actualmente en la página
//     const newImages = await page.evaluate(() => {
//       const imageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return imageElements.map((img) => img.src);
//     });

//     await page.evaluate(newImages => {
//       (window as any).images = (window as any).images.concat(newImages);
//     }, newImages);

//     // Calcula la distancia que debes desplazar el scroll para alcanzar el final del documento
//     const distance = await page.evaluate(() => {
//       return document.body.scrollHeight - window.innerHeight;
//     });

//     // Desplaza el scroll hacia abajo
//     await page.evaluate((distance) => {
//       window.scrollBy(0, distance);
//     }, distance);

//     // Espera a que se carguen más imágenes
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     // Verifica si hay más imágenes por cargar
//     moreImages = await page.evaluate(() => {
//       const newImageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return newImageElements.length > (window as any).images.length;
//     });
//   }

//   console.log(await page.evaluate(() => (window as any).images));

//   // Cierra el navegador
//   // await browser.close();
// };

// const twitter = async (name: string, folder: string): Promise<void> => {
//   // Inicia sesión en Twitter y navega hasta el perfil del usuario
//   const browser = await puppeter.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

//   await page.waitForNavigation();
//   await page.goto("https://twitter.com/joshwawo/media");
//   await page.waitForSelector('img[src^="https://pbs.twimg.com/media/"]');

//   // Almacena las imágenes en un array en el contexto del navegador
//   await page.evaluate(() => {
//     (window as any).images = [];
//   });

//   let moreImages = true;
//   let count = 0;

//   // Bucle que se ejecuta hasta que ya no haya más imágenes por cargar
//   while (moreImages) {
//     count++;
//     console.log(count);

//     // Descarga las imágenes que están actualmente en la página
//     const newImages = await page.evaluate(() => {
//       const imageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return imageElements.map((img) => img.src);
//     });

//     // Añade las nuevas imágenes al array en el contexto del navegador
//     await page.evaluate((newImages:any) => {
//       (window as any).images = (window as any).images.concat(newImages);
//     }, newImages);

//     // Función para desplazar el scroll hacia abajo
//     async function scrollToBottom(page: any) {
//       await page.evaluate(async () => {
//         await new Promise<void>((resolve, reject) => {
//           let totalHeight = 0;
//           const distance = 100;
//           const timer = setInterval(() => {
//             const scrollHeight = document.body.scrollHeight;
//             window.scrollBy(0, distance);
//             totalHeight += distance;

//             if (totalHeight >= scrollHeight) {
//               clearInterval(timer);
//               resolve();
//             }
//           }, 500);
//         });

//         // Vuelve a subir un poco para que se carguen más imágenes
//         window.scrollBy(0, -50);
//       });
//     }

//     // Desplaza el scroll hacia abajo
//     await scrollToBottom(page);

//     // Espera a que se carguen más imágenes
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     // Verifica si hay más imágenes por cargar
//     moreImages = await page.evaluate(() => {
//       const newImageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img[src^="https://pbs.twimg.com/media/"]'
//         )
//       );
//       return newImageElements.length > (window as any).images.length;
//     });
//   }

//   // Almacena las imágenes en un array en el contexto de Node
//   const images = await page.evaluate(() => {
//     return (window as any).images;
//   });

//   console.log(images);

//   // Cierra el navegador
//   await browser.close();

// }

// const twitter = async (name: string, folder: string): Promise<void> => {
//   // Inicia sesión en Twitter y navega hasta el perfil del usuario
//   const browser = await puppeter.launch({
//     headless: false,
//     userDataDir: "./twitter/datas",
//   });
//   const page = await browser.newPage();
//   // await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

//   // await page.waitForNavigation();
//   await page.goto("https://twitter.com/joshwawo/media");
//   await page.waitForSelector('img[src^="https://pbs.twimg.com/media/"]');

//   await page.evaluate(() => {
//     (window as any).images = [];
//   });

//   async function getImages(page: any) {
//     // Descarga las imágenes que están actualmente en la página
//     const newImages = await page.evaluate(() => {
//       const imageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img'
//         )
//       );
//       return imageElements.map((img) => img.src);
//     });

//     await page.evaluate((newImages:any) => {
//       (window as any).images = (window as any).images.concat(newImages);
//     }, newImages);
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     async function scrollToBottom(page: any) {
//       await page.evaluate(async () => {
//         await new Promise<void>((resolve, reject) => {
//           let totalHeight = 0;
//           const distance = 100;
//           const timer = setInterval(() => {
//             const scrollHeight = document.body.scrollHeight;
//             window.scrollBy(0, distance);
//             totalHeight += distance;

//             if (totalHeight >= scrollHeight) {
//               clearInterval(timer);
//               resolve();
//             }
//           }, 2000);
//         });

//         // Vuelve a subir un poco para que se carguen más imágenes

//         window.scrollBy(0, -50);
//       });
//     }

//     await scrollToBottom(page);

//     const moreImages = await page.evaluate(() => {
//       const newImageElements = Array.from(
//         document.querySelectorAll<HTMLImageElement>(
//           'img'
//         )
//       );
//       return newImageElements.length > (window as any).images.length;
//     });

//     if (moreImages) {
//       await getImages(page);
//     }
//   }

//   await getImages(page);

//   const images = await page.evaluate(() => {
//     return (window as any).images;
//   });

//   console.log(images);

//   await browser.close();
// };

async function downloadTwitterImages(
  page: any,
  images: string[] = []
): Promise<string[]> {
  // Descarga las imágenes que están actualmente en la página
  console.log("images", images);

  try {
    await page.waitForSelector('img[src^="https://pbs.twimg.com/media/"]');
    const newImages = await page.evaluate(() => {
      const imageElements = Array.from(
        document.querySelectorAll<HTMLImageElement>(
          'img[src^="https://pbs.twimg.com/media/"]'
        )
      );
      return imageElements.map((img) => img.src);
    });

    // Añade las nuevas imágenes al array de imágenes descargadas
    images?.push(...newImages);

    // Desplaza el scroll hacia abajo
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Espera a que se carguen más imágenes
    // await page.waitFor(2000);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Verifica si hay más imágenes por cargar
    const moreImages = await page.evaluate(() => {
      const newImageElements = Array.from(
        document.querySelectorAll<HTMLImageElement>(
          'img[src^="https://pbs.twimg.com/media/"]'
        )
      );
      return newImageElements.length > images.length;
    });

    if (moreImages) {
      // Si hay más imágenes, vuelve a llamar a la función recursivamente
      return downloadTwitterImages(page, images);
    } else {
      // Si no hay más imágenes, devuelve el array de imágenes descargadas
      return images;
    }
  } catch (error) {
    console.log(error);
  }
}

const twitter = async (name: string, folder: string): Promise<void> => {
  // Inicia sesión en Twitter y navega hasta el perfil del usuario
  const browser = await puppeter.launch({
    headless: false,
    userDataDir: "./twitter/datas",
  });
  const page = await browser.newPage();
  // await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

  // await page.waitForNavigation();
  await page.goto(`https://twitter.com/BeyenePat/media`);
  await page.waitForSelector("body");
  await page.waitForSelector('img[src^="https://pbs.twimg.com/media/"]');

  let arr: string[] = ['https://pbs.twimg.com/media/Eq2Z5ZbXMAA5Z5a?format=jpg&name=large'];
  let ima = await downloadTwitterImages(page, arr);

  console.log(ima);

  // Cierra el navegador
  await browser.close();
};

twitter("https://twitter.com/i/flow/login", "janna");
