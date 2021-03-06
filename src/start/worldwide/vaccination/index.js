const getData = require("../../../utils/getData");

const vaccination = (bot) => {
  bot.action('worldwide-vaccination', (ctx) => {

    ctx.deleteMessage();

    getData('https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1')
      .then((res) => {
        if (res.status === 200) {
          const results = res.data;
          const keyNames = Object.keys(results);

          let date = new Date(keyNames[0]);
          date = date.toLocaleString().toUpperCase();

          getData('https://disease.sh/v3/covid-19/all')
            .then((res2) => {
              if (res2.status === 200) {
                const results2 = res2.data;

                const testRates = ((results[keyNames[0]] / results2.population) * 100).toFixed(2).toLocaleString();

                const response = `š¦ š Total COVID-19 vaccinations as of <b><i>${date}</i></b> šš¦ \n\n\nā­š <b>${results[keyNames[0]].toLocaleString()}</b> (At least one dose taken š)\n\n...which is <b>${testRates}%</b> of the total world population š`;

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
                const response = `š¦ š Total COVID-19 vaccinations as of <b><i>${date}</i></b> šš¦ \n\nā­š <b>${results[keyNames[0]].toLocaleString()}</b> (At least one dose taken š)`;

                ctx.telegram.sendMessage(ctx.chat.id, response,
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
        } else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Something went wrong... š',
            {
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

module.exports = vaccination;