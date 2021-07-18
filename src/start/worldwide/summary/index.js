const summary = (bot) => {
  bot.action('worldwide-summary', (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'COVID-19 cases summary as of [date]',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Go back', callback_data: 'go-back-to-worldwide' }],
          ]
        }
      });
  });
};

export default summary;