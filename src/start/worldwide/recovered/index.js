import getData from "../../../utils/getData";

const recovered = (bot) => {
  bot.action('worldwide-recovered', (ctx) => {
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
          Total recovered COVID-19 cases as of ${localTime}\n\n${results.recovered.toLocaleString()}\n\nRecovered recently: ${results.todayRecovered.toLocaleString()}`;

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

export default recovered;