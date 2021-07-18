import dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';
const bot = new Telegraf(process.env.BOT_TOKEN);

import startMenu from './start/index.js';

startMenu(bot);

bot.launch();