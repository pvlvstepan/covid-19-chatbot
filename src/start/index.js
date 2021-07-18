import worldwide from './worldwide/index.js';

const startMenu = (bot) => {
  const startMenuContents = (ctx) => {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `Hi there, this is a chatbot that will help you track data and statistics of the latest COVID-19 cases around the globe.\n\n To begin, choose what action you want to do next.\n\nAlternatively, you can use /help to view the list of availbale commands`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Worldwide cases data', callback_data: 'worldwide' }],
            [{ text: 'Quit', callback_data: 'quit' }],
          ]
        }
      }
    );
  };

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