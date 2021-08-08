const getData = require("../../../utils/getData");

const total = (bot, country, iso3) => {
  bot.action(`country-total-${iso3}`, (ctx) => {

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

          const response = `🦠📉 Total COVID-19 cases in ${country} as of <b><i>${localTime}</i></b> 📉🦠\n\n\n⭕📊 <b>${results.cases.toLocaleString()}</b>\n\n🦠📈 New cases: <b>${results.todayCases.toLocaleString()}</b>`;

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

module.exports = total;