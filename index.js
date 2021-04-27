const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const config = require('dotenv').config().parsed;
console.log(config);
const ffmpeg = require('ffmpeg');
const opus = require("@discordjs/opus");
const ytdl = require('ytdl-core');

const client = new Discord.Client();
const prefix = "!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("your mother");
});

console.log('msg')
client.on("message", async (msg) => {
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.substring(1).split(" ");
    const user = msg.guild.member(msg.author);

    switch (args[0]) {
      case ("sunglasses"): {
        if (msg.mentions.users.size > 0) {
          if (!user.hasPermission("ADMINISTRATOR")) {
            //else if (!user.) 
            return msg.reply("You do not have permission to do this, dickhead! whats the matter? gonna cry? shit your pants? piss and cum? go back to your mommy and ask for some fucking breastmilk, you fucking child.");
          }

          return sunglasses(msg, false);
        }
        return sunglasses(msg, true);
      }
    }

    if (msg.content.startsWith(prefix)) {
      const args = msg.content.substring(1).split(" ");
      const user = msg.guild.member(msg.author);

      switch (args[0]) {
        case ("curse"): {
          if (msg.mentions.users.size > 0) {
            return msg.channel.send(`${msg.mentions.users.first()} is now cursed!`);
          }
        }
      }
    }

    if (!msg.member.voice.channel) {
      return msg.channel.send(`<@${msg.member.id}> you fucking retard you have to be in a voice channel first. if you dont want to then you can fuck off by jumping into a fucking volcano :sunglasses:`);
    }
    switch (args[0]) {
      case ("pain"):
        await joinVc(msg.member);
        break
      case ("astonish"):
        await joinVc2(msg.member);
        break
      case "paingone": {
        await leaveVc(msg.member);
        break
      }
    }
  }
});

const sunglasses = (msg, isSelf) => {
  // load the file that has the sunglasses content
  const file = fs.readFileSync(path.join(__dirname, "users.json"));
  const users = JSON.parse(file);

  const userId = isSelf ? msg.author.id : msg.mentions.users.first().id;

  // check if the user is there already
  const userIndex = users.findIndex((x) => x.discord_id == userId);

  let count;

  // if the user is there, add 1 to the sunglasses count, else add them and start at 1
  if (!isSelf) {
    if (userIndex === -1) {
      users.push({
        discord_id: userId,
        sunglasses_count: 1,
      });

      count = 1;
    } else {
      users[userIndex].sunglasses_count++;
      count = users[userIndex].sunglasses_count;
    }
  } else {
    if (userIndex === -1) {
      count = 0;
    } else {
      count = users[userIndex].sunglasses_count;
    }
  }

  // then save then reply
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users));

  msg.channel.send(`<@${msg.member.id}> You have been 😎'd ${count} times!`);
};

//blasts matts "favorite" song in a vc 😎
const joinVc = async (member) => {
  const connection = await member.voice.channel.join()
  console.log("joining");
 
  // const broadcast = client.voice.createBroadcast();
  console.log("playing")
  const dispatcher = await connection.play(ytdl('https://www.youtube.com/watch?v=T1lnO2dF9rM', {
    filter: 'audioonly'
  }));
  await msg.channel.send(`haha matt loves this song so much :sunglasses:`)
  dispatcher.on("error", (error) => {
    console.log(error)
  })
};

//blasts the entire astonishing in a vc
const joinVc2 = async (member) => {
  const connection = await member.voice.channel.join()
  console.log("joining");
  // const broadcast = client.voice.createBroadcast();
  console.log("astonishing")
  const dispatcher = await connection.play(ytdl('https://www.youtube.com/watch?v=bGMTuVjPqZE', {
    filter: 'audioonly'
  }));
  await msg.channel.send(`literally the best DT album :astonished: :hot_face:`)
  dispatcher.on("error", (error) => {
    console.log(error)
  })
};

//no more bot
const leaveVc = async (member) => {
  const connection = await member.voice.channel.leave()
  console.log("leavingVc")
  await msg.channel.send(`i thought you liked dream theater... oh well... bye i guess... :cry:`)
};


client.login(process.env.TOKEN);