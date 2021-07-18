require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("Bot is starting...");
});

bot.help((ctx) => {
  ctx.reply("This bot can perform the following commands:\n\n /start - Start the bot\n /help - Show this list of commands");
});

bot.launch();