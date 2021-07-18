import getData from "../../../utils/getData";

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

          const response = `
          Total COVID-19 completed tests as of ${localTime}\n\n${results.tests.toLocaleString()}\n\n...which is ${testRates}% of the total world population`;

          ctx.telegram.sendMessage(ctx.chat.id, response,
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'Go back', callback_data: 'go-back-to-worldwide' }],
                ]
              }
            });
        } else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Something went wrong...',
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'Go back', callback_data: 'go-back-to-worldwide' }],
                ]
              }
            });
        }
      });
  });
};

export default tests;