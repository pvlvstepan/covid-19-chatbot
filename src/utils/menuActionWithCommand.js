const menuActionWithCommand = (bot, command, message, extra) => {
  bot.command(command, (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, message, extra);
  });
  bot.action(command, (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, message, extra);
  });
  bot.action(`go-back-to-${command}`, (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, message, extra);
  });
};

module.exports = menuActionWithCommand;