const getData = require("../../../utils/getData");

const deaths = (bot, country, iso3) => {
  bot.action(`country-deaths-${iso3}`, (ctx) => {
    let results;

    ctx.deleteMessage();

    getData(`https://disease.sh/v3/covid-19/countries/${iso3}`)
      .then((res) => {
        if (res.status === 200) {
          results = res.data;

          let date = new Date(results.updated);
          date = date.toGMTString();
          let localTime = new Date(date);
          localTime = localTime.toLocaleString().toUpperCase();

          const mortalityRate = ((results.deaths / results.cases) * 100).toFixed(2).toLocaleString();

          const response = `🦠⚰ Total COVID-19 deaths in ${country} as of <b><i>${localTime}</i></b> ⚰🦠\n\n\n⭕📊 <b>${results.deaths.toLocaleString()}</b>\n\n\⚰📈 Mortality rate is <b>${mortalityRate}%</b>\n\n🦠😔 New deaths: <b>${results.todayDeaths.toLocaleString()}</b>`;

          ctx.telegram.sendMessage(ctx.chat.id, response,
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: '◀ Go back ◀', callback_data: `go-back-to-country-${iso3}` }],
                ]
              }
            });
        } else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Something went wrong... 😔',
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: '◀ Go back ◀', callback_data: `go-back-to-country-${iso3}` }],
                ]
              }
            });
        }
      });
  });
};

module.exports = deaths;