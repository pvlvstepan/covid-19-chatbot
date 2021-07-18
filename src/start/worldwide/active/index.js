const active = (bot) => {
  bot.action('worldwide-active', (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Active COVID-19 cases as of [date]',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Go back', callback_data: 'go-back-to-worldwide' }],
          ]
        }
      });
  });
};

export default active;