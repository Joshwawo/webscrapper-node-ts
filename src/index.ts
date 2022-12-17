import puppeter, { Browser, Page } from "puppeteer";
import fs from "node:fs";
import ora from "ora";
const spinner = ora({
  stream: process.stdout,
  spinner: "aesthetic",
});

const scrapper = async (name: string): Promise<void> => {
  spinner.text = "Iniciando...";
  spinner.start();

  const browser: Browser = await puppeter.launch({
    headless: false,
  });
  spinner.text = "Abiendo el navegador...";
  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  spinner.text = "Buscando la pagina...";
  await page.goto(`${name}`, {
    waitUntil: "networkidle2",
  });

  const allResultsSelector = "#main_nav_container";
  await page.waitForSelector(allResultsSelector);

  interface elementHTMl extends HTMLElement {
    elemento: elementHTMl;
  }

  type cosa = Omit<elementHTMl, "elemento"> | undefined;

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
  console.log(links.length);
  fs.writeFileSync(`./outputs/artStation/imgLinks.txt`, links.join("\n"));

  let pagePromise = (link: string) =>
    new Promise(async (resolve, reject) => {
      let dataObj = {
        creator: "no name",
        img: "",
      };
      let newPage = await browser.newPage();
      await newPage.goto(link);
      const mainSelector = "body";
      await newPage.waitForSelector(mainSelector);

      const wrapperSelector = ".wrapper";
      await newPage.waitForSelector(wrapperSelector);

      const imgSelector = "#main-nav > ul > li.main-menu-logo > a";
      await newPage.waitForSelector(imgSelector);

      const titleSelector = "body > div.wrapper ";
      await newPage.waitForSelector(titleSelector);
      const image = "div > div > picture > img";
      await newPage.waitForSelector(image);
      // const imgSelector =" div > div > picture > img"
      dataObj["img"] = await newPage.$eval(image, (img) => img.src);
      resolve(dataObj);
      await newPage.close();
    });

  for (let link in links) {
    let currentPageData = await pagePromise(links[link]);
    console.log(currentPageData);

    fs.appendFileSync(
      `./outputs/artStation/imgs.txt`,
      JSON.stringify(currentPageData) + "\n"
    );
  }

  spinner.succeed("Ya termine we");

  await browser.close();
};
let page = "https://www.artstation.com/search?sort_by=relevance&query=fortnite";
scrapper(page);
