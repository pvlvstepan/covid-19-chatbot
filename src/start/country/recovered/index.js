const getData = require("../../../utils/getData");

const recovered = (bot, country, iso3) => {
  bot.action(`country-recovered-${iso3}`, (ctx) => {
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

          const recoveryRate = ((results.recovered / results.cases) * 100).toFixed(2).toLocaleString();

          const response = `š¦ ā Total recovered COVID-19 cases in ${country} as of <b><i>${localTime}</i></b> āš¦ \n\n\nā­š <b>${results.recovered.toLocaleString()}</b>\n\n\āš Recovery rate is <b>${recoveryRate}%</b>\n\nš¦ ā° Recovered recently: <b>${results.todayRecovered.toLocaleString()}</b>`;

          ctx.telegram.sendMessage(ctx.chat.id, response,
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'ā Go back ā', callback_data: `go-back-to-country-${iso3}` }],
                ]
              }
            });
        } else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Something went wrong... š',
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'ā Go back ā', callback_data: `go-back-to-country-${iso3}` }],
                ]
              }
            });
        }
      });
  });
};

module.exports = recovered;