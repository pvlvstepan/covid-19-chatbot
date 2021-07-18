require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const first_name = ctx.message.from.first_name;
  const last_name = ctx.message.from.last_name;

  const msgFrom = `${first_name}${last_name ? ` ${last_name}` : ``}`;

  ctx.replyWithHTML(`Hi there, <b>${msgFrom}</b>, this is a chatbot that will help you track data and statistics of the latest COVID-19 cases around the globe.\n\n To begin, choose what action you want to do next:\n\n /worldwide - View worldwide cases data\n /country - View specific country cases data\n /location - View cases data in the country of your location (We would require access to your location)\n /help - View list of available commands`);
});

bot.help((ctx) => {
  ctx.reply("This bot can perform the following commands:\n\n /start - Start the bot\n /help - Show this list of commands");
});

bot.launch();