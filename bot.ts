import { Bot, Context, InlineKeyboard, Keyboard, SessionFlavor, session } from "grammy";
import { Menu } from "@grammyjs/menu";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot<MyContext>("6055446506:AAGbzl-YCcEMsLNAFLKcszSV1Y3xs24EozY"); // <-- put your bot token between the ""

// // You can now register listeners on your bot object `bot`.
// // grammY will call the listeners when users send messages to your bot.

// // Handle the /start command.
// bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// // Handle other messages.
// //bot.on("message", (ctx) => ctx.reply("Olá bem-vindo"));

// bot.hears("Oi",(ctx)=>{
//     const message = ctx.message;
//     const date = new Date();
//     return ctx.reply(``);
// })

// // Now that you specified how to handle messages, you can start your bot.
// // This will connect to the Telegram servers and wait for messages.

// // Start the bot.
// bot.start();

type MyContext = Context & ConversationFlavor & SessionFlavor<{ numero: number }>;
type MyConversation = Conversation<MyContext>;

async function greeting(conversation: MyConversation, ctx: MyContext) {
  // TODO: code the conversation
}

async function movie(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply("Olá bem vindo ao bot gerador de ticket \n Me mande seu numero para começarmos", {
    reply_markup: menu,
  });

  // const resultText = conversation.waitFor("msg:text")
  // resultText.then(async (res) => {
  //   await ctx.reply("Bem, que pena te vejo outro dia")
  //   //@ts-ignore
  //   await ctx.conversation.exit()

  //   conversation._deactivate();
  //   //return;
  // })
  //@ts-ignore
  const res = await conversation.waitFrom(ctx.from);
  console.log(res.message?.contact);
  
  if (res.message?.contact) {
    
    await ctx.reply(`Olá bem vindo ao sistema ${res.message.contact.first_name}`, { reply_markup: { remove_keyboard: true } })
    
  } else {
    await ctx.reply("Até logo.", { reply_markup: { remove_keyboard: true } });
    //@ts-ignore
  }
  console.log(res.message);
/*

*/

  //throw new Error("Catch me if you can!");
  return;


}

const menu = new Keyboard()
  .requestContact("Compartilhar o numero").row()
  .text("Não obrigado").row()
  .resized();

// Make it interactive.

bot.catch((err) => console.error("Conversation threw an error!", err));
// Install the session plugin.

bot.use(session({
  initial() {
    // return empty object for now
    return {};
  },
}));

// Install the conversations plugin.

bot.use(conversations());

bot.use(createConversation(movie));
// bot.command("start", async (ctx) => {
//   // Send the menu.
//   //@ts-expect-error
//   await ctx.conversation.enter("movie");
//   return;
// });

bot.on("message", async (ctx) => {

  await ctx.conversation.enter("movie");
})

bot.start();