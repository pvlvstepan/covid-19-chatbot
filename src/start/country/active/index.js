const getData = require("../../../utils/getData");

const active = (bot, country, iso3) => {
  bot.action(`country-active-${iso3}`, (ctx) => {

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

          const response = `š¦ š¤ Active COVID-19 cases in ${country} as of <b><i>${localTime}</i></b> š¤š¦ \n\n\nā­š <b>${results.active.toLocaleString()}</b>\n\nš¦ šµ In critical condition: <b>${results.critical.toLocaleString()}</b>`;

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

module.exports = active;