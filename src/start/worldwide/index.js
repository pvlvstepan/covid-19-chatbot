import menuActionWithCommand from '../../utils/menuActionWithCommand.js';

import summary from './summary/index.js';
import total from './total/index.js';
import active from './active/index.js';
import recovered from './recovered/index.js';
import deaths from './deaths/index.js';
import vaccination from './vaccination/index.js';
import tests from './tests/index.js';

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

export default worldwide;