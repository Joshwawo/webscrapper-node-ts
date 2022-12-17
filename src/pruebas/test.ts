import puppeteer, { Browser, Page } from "puppeteer";
import fs from "node:fs";
import ora from "ora";

const spinner = ora({
  stream: process.stdout,
  // spinner: "aesthetic",
});



const scraper = async (search:string): Promise<void> => {
  spinner.text = "iniciando....";
  spinner.start();
  const browser: Browser = await puppeteer.launch();
  const page: Page = await browser.newPage();

  spinner.text = "abriendo la pagina";
  await page.goto("https://developers.google.com/web/");
  // Type into search box.
  spinner.text = "Escribiendo en el input";
  await page.type(".devsite-search-field", `${search}`);
  spinner.text = "esperando los resultados de busqueda?";

  // Wait for suggest overlay to appear and click "show all results".
  const allResultsSelector = ".devsite-suggest-all-results";
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);

  // Wait for the results page to load and display the results.
  const resultsSelector = ".gsc-results .gs-title";
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  spinner.text = "Extrayendo los datos";
  const links: string[] = await page.evaluate((resultsSelector) => {
    return [...document.querySelectorAll(resultsSelector)].map(
      (anchor: HTMLAnchorElement) => {
        const title = anchor.textContent.split("|")[0].trim();
        return `${title} - ${anchor.href}`;
      }
    );
  }, resultsSelector);

  // Print all the files.
  console.log(links.join("\n"));
  spinner.text = "Escribiendo en el sistema los links";
  fs.writeFileSync(`./outputs/${search.trim().replaceAll(' ', "-")}.txt`, links.join("\n"));
  spinner.succeed(`Se escribieron ${links.length}  resultados en el .txt`);

  await browser.close();
};

scraper('headless Headless Chrome');
