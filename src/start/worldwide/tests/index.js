const getData = require("../../../utils/getData");

const tests = (bot) => {
  bot.action('worldwide-tests', (ctx) => {
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

          const testRates = ((results.tests / results.population) * 100).toFixed(2).toLocaleString();

          const response = `š¦ š§« Total COVID-19 completed tests as of <b><i>${localTime}</i></b> š§«š¦ \n\n\nā­š <b>${results.tests.toLocaleString()}</b>\n\n...which is <b>${testRates}%</b> of the total world population š`;

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

module.exports = tests;