"use strict";

// File that holds all the company names (as defined in crunchbase website) that we are interested in.
const INPUT_FILE = './crunchbase_names.json'
const DATA_FOLDER = "./Raw_Websites"

//Need to install puppeteer using npm...
const fs = require('fs');
const puppeteer = require('puppeteer-extra');

// ...add the stealth plugin using the defaults (all evasion techniques)
// See: https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth 
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// The initial crunchbase url that we need to crawl
const ORG_URL = "https://www.crunchbase.com/organization/";

// To hold the websites that we already crawl
let DONE_NAMES = [];

//Check for the already crawled websites directory and create it if not exists
if (!fs.existsSync(DATA_FOLDER)) { fs.mkdirSync(DATA_FOLDER); }

// Read all files (company websites) that we already crawled
fs.readdirSync(DATA_FOLDER).forEach(file => {
    DONE_NAMES.push(file.split(".")[0]);
});

// Crawler support functions ///////////////////////////////////////////////////////////////////////////////////////////
// Add delay on page load at different points in time during loading
function delay(time) {
	return new Promise(function(resolve) {
		setTimeout(resolve, time)
	});
}

// Page autoscroll function
async function autoScroll(page){
	await page.evaluate(async () => {
		await new Promise((resolve, reject) => {
			let totalHeight = 0;
			let distance = 100;
			let timer = setInterval(() => {
				let scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;
				if(totalHeight >= scrollHeight){
					clearInterval(timer);
					resolve();
				}
			}, 300);
		});
	});
}
// Crawler support functions - END /////////////////////////////////////////////////////////////////////////////////////

//  Crawler main code //////////////////////////////////////////////////////////////////////////////////////////////////
async function run(url, f_name) {
	// Setup the browser and the new page tab. We run a full flag browser in our case.
	const browser = await puppeteer.launch({headless: false, args: ['--disable-features=site-per-process', `--unhandled-rejections=strict`]});
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await delay(1000);
    await page.goto(url, {waitUntil: 'load', timeout: 0});

    await delay(10000);
	console.log("Entering page auto scroll mode ...");
	await autoScroll(page);

    const html = await page.content();

    await delay(1000);
    fs.writeFileSync(DATA_FOLDER + "/" + f_name + '.html', html);
    await delay(1000);
    browser.close();
}
//  Crawler main code - END ////////////////////////////////////////////////////////////////////////////////////////////

// Read the input file
let rawdata = fs.readFileSync(INPUT_FILE);
let d_names = JSON.parse(rawdata);

async function start(d_names) {
    for (let i in d_names){
        if (!DONE_NAMES.includes(d_names[i])){
			console.log("Crawling " + d_names[i] + "...");
            await run(ORG_URL + d_names[i], d_names[i])
        } else {
            console.log(d_names[i] + " already crawled.")
        }
    }
}

start(d_names);
