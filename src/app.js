import dotenv from 'dotenv';
dotenv.config();

import { Composer } from 'micro-bot';
const bot = new Composer();

import startMenu from './start/index.js';

startMenu(bot);

export default bot;