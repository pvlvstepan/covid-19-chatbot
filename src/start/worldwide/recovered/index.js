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

          const recoveryRate = ((results.recovered / results.cases) * 100).toFixed(2).toLocaleString();

          const response = `🦠✅ Total recovered COVID-19 cases as of <b><i>${localTime}</i></b> ✅🦠\n\n\n⭕📊 <b>${results.recovered.toLocaleString()}</b>\n\n\✅📈 Recovery rate is <b>${recoveryRate}%</b>\n\n🦠⏰ Recovered recently: <b>${results.todayRecovered.toLocaleString()}</b>`;

          ctx.telegram.sendMessage(ctx.chat.id, response,
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: '◀ Go back ◀', callback_data: 'go-back-to-worldwide' }],
                ]
              }
            });
        } else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Something went wrong... 😔',
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: '◀ Go back ◀', callback_data: 'go-back-to-worldwide' }],
                ]
              }
            });
        }
      });
  });
};

export default recovered;