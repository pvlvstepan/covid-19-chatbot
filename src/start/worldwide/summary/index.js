const getData = require("../../../utils/getData");

const summary = (bot) => {
  bot.action('worldwide-summary', (ctx) => {
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

          const response = `š¦ ā£ COVID-19 cases summary as of <b><i>${localTime}</i></b> ā£š¦ \n\n\nš¦ š Total cases: <b>${results.cases.toLocaleString()}</b>\n\nš¦ š New cases: <b>${results.todayCases.toLocaleString()}</b>\n\nš¦ ā° Total deaths: <b>${results.deaths.toLocaleString()}</b>\n\nš¦ š New deaths: <b>${results.todayDeaths.toLocaleString()}</b>\n\nš¦ ā Total recovered: <b>${results.recovered.toLocaleString()}</b>\n\nš¦ ā° New recoveries: <b>${results.todayRecovered.toLocaleString()}</b>\n\nš¦ š¤ Active cases: <b>${results.active.toLocaleString()}</b>\n\nš¦ šµ In critical condition: <b>${results.critical.toLocaleString()}</b>\n\nš¦ š¾ Affected countries: <b>${results.affectedCountries}</b>`;

          ctx.telegram.sendMessage(ctx.chat.id, response,
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'ā Go back ā', callback_data: 'go-back-to-worldwide' }],
                ]
              }
            });
        } else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Something went wrong... š',
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'ā Go back ā', callback_data: 'go-back-to-worldwide' }],
                ]
              }
            });
        }
      });
  });
};

module.exports = summary;