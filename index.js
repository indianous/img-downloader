require("dotenv").config();
const browser = require('./bots/browser');
const pageController = require('./bots/pageController');

// inicia o navagador e cria uma instância para ele.
let newBrowser = browser.startBrowser();

// passa a instância do navegador para o controlador da página
pageController(newBrowser);