const getData = require("../../../utils/getData");

const active = (bot) => {
  bot.action('worldwide-active', (ctx) => {

    let results;

    ctx.deleteMessage();

    getData('https://disease.sh/v3/covid-19/all')
      .then((res) => {
        if (res.status === 200) {
          results = res.data;

          let date = new Date(results.updated);
          date = date.toGMTString();
          let localTime = new Date(date);
          localTime = localTime.toLocaleString().toUpperCase();

          const response = `🦠🤒 Active COVID-19 cases as of <b><i>${localTime}</i></b> 🤒🦠\n\n\n⭕📊 <b>${results.active.toLocaleString()}</b>\n\n🦠😵 In critical condition: <b>${results.critical.toLocaleString()}</b>`;

          ctx.telegram.sendMessage(ctx.chat.id, response,
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: '◀ Go back ◀', callback_data: 'go-back-to-worldwide' }],
                ]
              }
            });
        } else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Something went wrong... 😔',
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: '◀ Go back ◀', callback_data: 'go-back-to-worldwide' }],
                ]
              }
            });
        }
      });
  });
};

module.exports = active;