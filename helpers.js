import { getRequest } from "./server.js";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

export const mapCommunalTypeForRequest = (type) => {
  let value;
  switch (type) {
    case "Բոլոր Կոմունալներ": {
      return (value = "overall");
    }
    case "Գազ": {
      return (value = "gas");
    }
    case "Ջուր": {
      return (value = "water");
    }
    case "Հոսանք": {
      return (value = "el");
    }
    default:
      return (value = null);
  }
};

export const someRequest = async (initials, communalType, phone) => {
  const firstName = initials.split(" ")[0];
  const lastName = initials.split(" ")[1];
  if (!firstName || !lastName || !communalType || !phone) return null;
  const type = mapCommunalTypeForRequest(communalType);
  //@TODO issue
  const result = await getRequest(firstName, lastName, type, phone);
  if (result) {
    return result;
  } else return null;
};

export const CREDENTIALS_REQUEST_TEXT =
  "Խնդրում ենք գրել ձեր անուն ազգանոնը այսպես - Հակոբ Հակոբյան";
export const PHONE_REQUEST = "Նշեք հեռախոսահամարը առանց +374 և 0";
export const WRONG = "Տվյալները սխալ են, խնդրում ենք փորձել նորից /start";
export const OPTIONS = [
  { text: "Բոլոր Կոմունալներ" },
  { text: "Գազ" },
  { text: "Հոսանք" },
  { text: "Ջուր" },
];
export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
export const MONGO_URI = process.env.SCHEMA_URL;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
