const getData = require("../../../utils/getData");

const deaths = (bot) => {
  bot.action('worldwide-deaths', (ctx) => {
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

          const mortalityRate = ((results.deaths / results.cases) * 100).toFixed(2).toLocaleString();

          const response = `🦠⚰ Total COVID-19 deaths as of <b><i>${localTime}</i></b> ⚰🦠\n\n\n⭕📊 <b>${results.deaths.toLocaleString()}</b>\n\n\⚰📈 Mortality rate is <b>${mortalityRate}%</b>\n\n🦠😔 New deaths: <b>${results.todayDeaths.toLocaleString()}</b>`;

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

module.exports = deaths;