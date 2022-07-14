const scraper = require('./pageScraper');
const fs = require('fs');
const { env } = require('process');

async function controller(browserInstance){
    let browser;
    try {
        browser = await browserInstance;

        const page = await browser.newPage();
        await login(page);
        console.log("login bem sucedido!!!");
        console.log('vasculhando páginas...');
        const list = await navigationAllPages(browser, process.env.URL_BOOKMARKS);
        await saveData(list);
        browser.close();
    } catch (error) {
        console.log("'Não foi possivel utilizar a instância do navegador => :'", error);
    }
}
async function login(page){
    let loginPage;
    try {
        console.log("fazendo login...");
        loginPage = await page;
        await loginPage.setDefaultNavigationTimeout(0);
        await loginPage.goto(process.env.URL_LOGIN);
        await loginPage.type(process.env.SELECTOR_USERNAME, process.env.USER_USERNAME);
        await loginPage.type(process.env.SELECTOR_PASSWORD, process.env.USER_PASSWORD);
        await loginPage.click(process.env.SELECTOR_SUBMIT);
        await loginPage.waitForSelector(process.env.SELECTOR_LOGIN);

    } catch (error) {
        console.log("Não foi possível fazer o login => :", error);
    }
}
async function navigationAllPages(browser, url){
    try {
        let i = 1;
        let listIds = [];
        let currentUrl = url + '?p=' + i.toString();
        let x;
        do {
            //x = document.querySelector('[href="' + currentUrl + '"]');
            //x = document.querySelector('[href="/en/users/19546848/bookmarks/artworks?p=1"]');
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto(process.env.URL_SITE + currentUrl);
            await page.waitForSelector(process.env.SELECTOR_BOOKMARKS);
            listIds.push(await scraper.scraper(page));
            console.log('href="' + currentUrl + '"');
            i++;
            currentUrl = url + '?p=' + i.toString();
            x = await page.$('[href="' + currentUrl + '"]');
            page.close();
        } while (x != null);
        //} while (i < 5);
        return listIds;
    } catch (error) {
        console.log("não foi possível navegar nas páginas => :", error);
    }
}
async function saveData(list){
    fs.writeFile("data.json", JSON.stringify(list), 'utf8', function(error){
        if(error){
            return console.log(error)
        }
        console.log("Os dados foram coletados e salvos com sucesso! verifique-os em data.json.");
    })

}

module.exports = (browserInstance) => controller(browserInstance)