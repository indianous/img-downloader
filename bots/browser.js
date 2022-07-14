const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        console.log('Abrindo o navegador...');
        browser = await puppeteer.launch({ headless: true, });
    } catch (error) {
        console.log('Não foi possivel criar uma instancia do navegador => :', error);
    }
    return browser;
}

module.exports = { startBrowser};