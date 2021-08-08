const getData = require("../../utils/getData");
const active = require("./active");
const deaths = require("./deaths");
const summary = require("./summary");
const total = require("./total");
const recovered = require("./recovered");
const vaccination = require("./vaccination");
const tests = require("./tests");

const country = (bot) => {

  let message = 0;

  const initActions = (ctx, markup, country, iso3) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, '🦠📊 What type of data do you want to see? 📊🦠', markup);

    active(bot, country, iso3);
    deaths(bot, country, iso3);
    summary(bot, country, iso3);
    total(bot, country, iso3);
    recovered(bot, country, iso3);
    vaccination(bot, country, iso3);
    tests(bot, country, iso3);
  };

  bot.action("country", (ctx) => {
    ctx.deleteMessage();
    getData('https://disease.sh/v3/covid-19/countries')
      .then((res) => {
        if (res.status === 200) {
          results = res.data;

          let message = '🦠📊 Please select one of the countries from the list. 📊🦠\n\n\n';
          results.map(val => {

            const markup = {
              reply_markup: {
                inline_keyboard: [
                  [{ text: '🦠☣ Latest cases summary', callback_data: `country-summary-${val.countryInfo.iso3}` }],
                  [{ text: '🦠📉 Total cases', callback_data: `country-total-${val.countryInfo.iso3}` }, { text: '🦠🤒 Total active', callback_data: `country-active-${val.countryInfo.iso3}` }],
                  [{ text: '🦠✅ Total recovered', callback_data: `country-recovered-${val.countryInfo.iso3}` }, { text: '🦠⚰ Total deaths', callback_data: `country-deaths-${val.countryInfo.iso3}` }],
                  [{ text: '🦠💉 Vaccination updates', callback_data: `country-vaccination-${val.countryInfo.iso3}` }],
                  [{ text: '🦠🧫 Tests summary', callback_data: `country-tests-${val.countryInfo.iso3}` }],
                  [{ text: '◀ Back to countries ◀', callback_data: 'back-to-countries' }],
                ]
              }
            };

            message = `${message}${val.country} - /${val.countryInfo.iso3}\n`;

            bot.command(`/${val.countryInfo.iso3}`, (ctx) => {
              ctx.deleteMessage();
              initActions(ctx, markup, val.country, val.countryInfo.iso3);
            });
            bot.action(`go-back-to-country-${val.countryInfo.iso3}`, (ctx) => {
              initActions(ctx, markup, val.country, val.countryInfo.iso3);
            });
            bot.action(`back-to-countries`, (ctx) => {
              ctx.deleteMessage();
            });
          });
          ctx.telegram.sendMessage(ctx.chat.id, message,
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: '◀ Back to start ◀', callback_data: 'go-back-to-start' }],
                ]
              }
            });
        } else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Something went wrong... 😔',
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [{ text: '◀ Go back ◀', callback_data: 'go-back-to-start' }],
                ]
              }
            });
        }
      });
  });

};

module.exports = country;