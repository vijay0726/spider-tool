const puppeteer = require('puppeteer');
const yargs = require('yargs');

async function fetchPage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    let body = await page.evaluate(() => document.body.innerText);
    console.log(body);
    await browser.close();
}

async function spider(count, url) {
    const promises = [];
    for (let i = 0; i < count; ++i) {
        promises.push(fetchPage(url));
    }
    await Promise.all(promises);
}

const argv = yargs
    .option('c', {
        alias: 'count',
        description: 'Number of requests to send at once',
        type: 'number',
    })
    .option('u', {
        alias: 'url',
        description: 'The URL to fetch',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

spider(argv.c, argv.u);
