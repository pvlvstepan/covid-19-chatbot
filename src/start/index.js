import worldwide from './worldwide/index.js';

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
      `Hi there <b>${first_name + (last_name ? ` ${last_name}` : '')}</b> 👋, this is a chatbot that will help you track 📊 data and statistics 📈 of the latest 🦠COVID-19🦠 cases around the globe 🌎\n\n ⬇ To begin, choose what action you want to do next ⬇\n\n\nAlternatively, you can use /help command to view the list of availbale commands`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🌐 Worldwide cases data 📊', callback_data: 'worldwide' }],
            [{ text: '❌ Quit ❌', callback_data: 'quit' }],
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
};

export default startMenu;