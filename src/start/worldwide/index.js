const menuActionWithCommand = require('../../utils/menuActionWithCommand.js');

const summary = require('./summary/index.js');
const total = require('./total/index.js');
const active = require('./active/index.js');
const recovered = require('./recovered/index.js');
const deaths = require('./deaths/index.js');
const vaccination = require('./vaccination/index.js');
const tests = require('./tests/index.js');

const worldwide = (bot) => {
  // submenu structure
  const worldwide_reply_markup = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🦠☣ Latest cases summary', callback_data: 'worldwide-summary' }],
        [{ text: '🦠📉 Total cases', callback_data: 'worldwide-total' }, { text: '🦠🤒 Total active', callback_data: 'worldwide-active' }],
        [{ text: '🦠✅ Total recovered', callback_data: 'worldwide-recovered' }, { text: '🦠⚰ Total deaths', callback_data: 'worldwide-deaths' }],
        [{ text: '🦠💉 Vaccination updates', callback_data: 'worldwide-vaccination' }],
        [{ text: '🦠🧫 Tests summary', callback_data: 'worldwide-tests' }],
        [{ text: '◀ Back to start ◀', callback_data: 'go-back-to-start' }],
      ]
    }
  };

  // initialize submenu
  menuActionWithCommand(bot, 'worldwide', '🦠📊 What type of data do you want to see? 📊🦠', worldwide_reply_markup);

  // initialize submenu actions
  summary(bot);
  total(bot);
  active(bot);
  recovered(bot);
  deaths(bot);
  vaccination(bot);
  tests(bot);
};

module.exports = worldwide;