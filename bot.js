import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import {
  CREDENTIALS_REQUEST_TEXT,
  OPTIONS,
  PHONE_REQUEST,
  someRequest,
  WRONG,
} from "./helpers.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (startMsg) => {
  bot.sendMessage(startMsg.chat.id, `Բարև ձեզ ${startMsg.from.first_name}!`);
  const keyboard = {
    keyboard: [OPTIONS],
    resize_keyboard: true,
    one_time_keyboard: true,
  };
  bot
    .sendMessage(
      startMsg.chat.id,
      "Նշեք ին կոմունալ ծառայություն էք ուզում վճարել?",
      { reply_markup: JSON.stringify(keyboard) }
    )
    .then(() => {
      bot.once("message", (msgType) => {
        if (
          msgType.text === "Բոլոր Կոմունալներ" ||
          msgType.text === "Գազ" ||
          msgType.text === "Ջուր" ||
          msgType.text === "Հոսանք"
        ) {
          const type = msgType.text;
          bot
            .sendMessage(msgType.chat.id, CREDENTIALS_REQUEST_TEXT)
            .then(() => {
              bot.once("message", (msgCredentials) => {
                const credentials = msgCredentials.text;
                bot
                  .sendMessage(msgCredentials.chat.id, PHONE_REQUEST)
                  .then(() => {
                    bot.once("message", (msgPhone) => {
                      const phone = msgPhone.text;
                      someRequest(credentials, type, phone)
                        .then((r) =>
                          bot.sendMessage(
                            msgCredentials.chat.id,
                            `${type}-ի վճարման ենթակա է ${r}`
                          )
                        )
                        .catch((err) => {
                          bot.sendMessage(msgCredentials.chat.id, err);
                        });
                    });
                  });
              });
            });
        } else {
          bot.sendMessage(startMsg.chat.id, WRONG);
        }
      });
    });
});
