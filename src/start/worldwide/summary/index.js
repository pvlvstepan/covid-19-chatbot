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

          const response = `🦠☣ COVID-19 cases summary as of <b><i>${localTime}</i></b> ☣🦠\n\n\n🦠📉 Total cases: <b>${results.cases.toLocaleString()}</b>\n\n🦠📈 New cases: <b>${results.todayCases.toLocaleString()}</b>\n\n🦠⚰ Total deaths: <b>${results.deaths.toLocaleString()}</b>\n\n🦠😔 New deaths: <b>${results.todayDeaths.toLocaleString()}</b>\n\n🦠✅ Total recovered: <b>${results.recovered.toLocaleString()}</b>\n\n🦠⏰ New recoveries: <b>${results.todayRecovered.toLocaleString()}</b>\n\n🦠🤒 Active cases: <b>${results.active.toLocaleString()}</b>\n\n🦠😵 In critical condition: <b>${results.critical.toLocaleString()}</b>\n\n🦠🗾 Affected countries: <b>${results.affectedCountries}</b>`;

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

export default summary;