const { Composer } = require('micro-bot');
const bot = new Composer();

const startMenu = require('./start/index.js');

startMenu(bot);

module.exports = bot;