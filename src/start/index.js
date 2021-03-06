const country = require('./country/index.js');
const worldwide = require('./worldwide/index.js');

const startMenu = (bot) => {
  // menu structure
  const startMenuContents = (ctx) => {

    let first_name;
    let last_name;

    if (ctx.message) {
      first_name = ctx.message.from.first_name;
      last_name = ctx.message.from.last_name;
    } else {
      first_name = ctx.update.callback_query.from.first_name;
      last_name = ctx.update.callback_query.from.last_name;
    }

    ctx.telegram.sendMessage(
      ctx.chat.id,
      `Hi there <b>${first_name + (last_name ? ` ${last_name}` : '')}</b> ð, this is a chatbot that will help you track ð data and statistics ð of the latest ð¦ COVID-19ð¦  cases around the globe ð\n\n â¬ To begin, choose what action you want to do next â¬\n\n\nAlternatively, you can use /help command to view the list of availbale commands`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'ð Worldwide cases data ð', callback_data: 'worldwide' }],
            [{ text: 'ð Country cases data ð', callback_data: 'country' }],
          ]
        }
      }
    );
  };

  // initialize menu
  bot.start((ctx) => {
    startMenuContents(ctx);
  });

  bot.action('go-back-to-start', (ctx) => {
    ctx.deleteMessage();
    startMenuContents(ctx);
  });

  worldwide(bot);
  country(bot);
};

module.exports = startMenu;