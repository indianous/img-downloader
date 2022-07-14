const scraper = {
    async scraper(page){
        let bookmarkPage = page;
        try {
            return await bookmarkPage.evaluate( () => {
                const nodeList = document.querySelectorAll('[data-gtm-user-id]');
                const arrayImg = [...nodeList]
                return arrayImg.map(img => {return img.getAttribute('data-gtm-value')})
            })   
        } catch (error) {
            console.log('não foi possível varrer a página => :', error);
        }
    }
}

module.exports = scraper