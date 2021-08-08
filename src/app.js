//require('dotenv').config();
// { Telegraf } = require("telegraf");
const { Composer } = require('micro-bot');

//const bot = new Telegraf(process.env.BOT_TOKEN);
const bot = new Composer();
const startMenu = require('./start/index.js');
startMenu(bot);

//bot.launch();
module.exports = bot;