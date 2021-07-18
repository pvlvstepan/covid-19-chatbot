import getData from "../../../utils/getData";

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

          const response = `
          COVID-19 cases summary as of ${localTime}\n\nTotal cases: ${results.cases.toLocaleString()}\nNew cases: ${results.todayCases.toLocaleString()}\nTotal deaths: ${results.deaths.toLocaleString()}\nNew deaths: ${results.todayDeaths.toLocaleString()}\nTotal recovered: ${results.recovered.toLocaleString()}\nNew recoveries: ${results.todayRecovered.toLocaleString()}\nActive cases: ${results.active.toLocaleString()}\nIn critical condition: ${results.critical.toLocaleString()}\n\nAffected countries: ${results.affectedCountries}`;

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

export default summary;