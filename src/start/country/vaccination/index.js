const getData = require("../../../utils/getData");

const vaccination = (bot, country, iso3) => {
  bot.action(`country-vaccination-${iso3}`, (ctx) => {

    ctx.deleteMessage();

    getData(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${iso3}?lastdays=1`)
      .then((res) => {
        if (res.status === 200) {
          const results = res.data.timeline;
          const keyNames = Object.keys(results);

          let date = new Date(keyNames[0]);
          date = date.toLocaleString().toUpperCase();

          getData(`https://disease.sh/v3/covid-19/countries/${iso3}`)
            .then((res2) => {
              if (res2.status === 200) {
                const results2 = res2.data;

                const testRates = ((results[keyNames[0]] / results2.population) * 100).toFixed(2).toLocaleString();

                const response = `🦠💉 Total COVID-19 vaccinations in ${country} as of <b><i>${date}</i></b> 💉🦠\n\n\n⭕📊 <b>${results[keyNames[0]].toLocaleString()}</b> (At least one dose taken 💉)\n\n...which is <b>${testRates}%</b> of the total country population 🌎`;

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
                const response = `🦠💉 Total COVID-19 vaccinations in ${country} as of <b><i>${date}</i></b> 💉🦠\n\n⭕📊 <b>${results[keyNames[0]].toLocaleString()}</b> (At least one dose taken 💉)`;

                ctx.telegram.sendMessage(ctx.chat.id, response,
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
        } else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Something went wrong... 😔',
            {
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

module.exports = vaccination;