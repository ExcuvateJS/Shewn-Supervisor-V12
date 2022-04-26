const Discord = require('discord.js');
const client = new Discord.Client()
const db = require('quick.db');
const config = require('./src/Config.json')
const fs = require('fs');
const moment = require("moment");
const chalk = require('chalk');
require('./src/Util/Loader.js')(client);

// POWERED BY SHEWN?
// İZİNSİZ PAYLAŞILMASI KESİNLİKLE YASAKTIR!

client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection();  
//===============================================================\\
fs.readdir('./src/Admin/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} Komut Yüklenecek.`);
  files.forEach(f => {                       
    let props = require(`./src/Admin/${f}`);   
    console.log(`${props.help.name} Komutu Yüklendi.`);  
      client.commands.set(props.help.name, props); 
      props.conf.aliases.forEach(alias => {          
        client.aliases.set(alias, props.help.name);  
    });
  });
})
//===============================================================\\
fs.readdir('./src/Staff/', (err, files) => { 
    if (err) console.error(err);               
    console.log(`${files.length} Komut Yüklenecek.`);
    files.forEach(f => {                       
      let props = require(`./src/Staff/${f}`);   
      console.log(`${props.help.name} Komutu Yüklendi.`);  
      client.commands.set(props.help.name, props); 
      props.conf.aliases.forEach(alias => {          
        client.aliases.set(alias, props.help.name);  
      });
    });
  })
//===============================================================\\
fs.readdir('./src/User/', (err, files) => { 
    if (err) console.error(err);               
    console.log(`${files.length} Komut Yüklenecek.`);
    files.forEach(f => {                       
      let props = require(`./src/User/${f}`);   
      console.log(`${props.help.name} Komutu Yüklendi.`);  
      client.commands.set(props.help.name, props); 
      props.conf.aliases.forEach(alias => {          
        client.aliases.set(alias, props.help.name);  
      });
    });
  })
//===============================================================\\


client.on("guildMemberAdd", member => {
  member.roles.add(config.Otomatic.GuildLoginOtoNick)
  });
  
  
  
  client.on("guildMemberAdd", member => {
    member.roles.add(config.Otomatic.GuildLoginOtoNick)
    });
  
  
  
    client.on("guildMemberAdd", member => {
      member.roles.add(config.Otomatic.GuildLoginOtoNick)
      });

      client.on("guildMemberAdd", member => {
        member.setNickname(config.Otomatic.GuildLoginOtoNick) 
        });


client.on("guildBanRemove", (guild, user) => {
    const databaseNotBan = require('quick.db')
    const bans = databaseNotBan.get(`acilmayanBan.shewn.${guild.id}`) || [];
    if (bans.some(ban => ban.user.id == user.id)) return guild.members.ban(user, { reason: 'Açılmayan Ban Sistemi Shewn?' });
});


client.on('ready', () => {
    const database = require('quick.db')
    client.guilds.cache.forEach(guild => {
    guild.members.cache.forEach(async member => {
    const fetch = await database.fetch(member.user.id);
    if(!fetch) return;
    if((Date.now() <= fetch.end) || fetch) {
    let kalan = fetch.end - Date.now();
    let logChannelID = config.Logs.CmuteLogID;
    let logChannel = await guild.channels.cache.get(logChannelID);
    setTimeout(() => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(fetch.moderatorUsername, fetch.moderatorAvatarURL);
    return member.roles.remove(config.Roles.CmuteRolID).then(() => database.delete(member.user.id) && logChannel.send(embed.setColor('GREEN').setTitle('Susturulması açıldı.').setDescription(`**• Moderatör**: <@!${fetch.moderatorID}>
    **• Susturulan**: <@!${member.user.id}>
    **• Sebep**: ${fetch.reason}`)));
    }, kalan);
    };
    });
    });
    });

// POWERED BY SHEWN?
    


// POWERED BY SHEWN?


        client.on('messageDelete', async message => {
            if(message.author.bot || !message.content) return;
           const databaseSnipe = require('quick.db').push(message.guild.id, {
              author: message.author,
              authorTAG: message.author.tag,
              authorID: message.author.id,
              authorUSERNAME: message.author.username,
              authorDISCRIMINATOR: message.author.discriminator,
              messageID: message.id,
              messageCHANNEL: message.channel,
              messageCHANNELID: message.channel.id,
              messageCONTENT: message.content,
              messageCREATEDAT: message.createdAt
            });
          });



const ms = require("parse-ms");
const dbAfk = require('quick.db')

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;

  if (await dbAfk.fetch(`afk_${message.author.id}`)) {
    dbAfk.delete(`afk_${message.author.id}`);
    dbAfk.delete(`afk_süre_${message.author.id}`);

    const shewn4 = new Discord.MessageEmbed()

      .setColor("RANDOM")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription("``Başarıyla afk modundan çıkıldı.``");

    message.channel.send(shewn4);
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await dbAfk.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await dbAfk.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);

    const shewnafk = new Discord.MessageEmbed()

      .setColor("RANDOM")
      .setDescription(`**Bu Kullanıcı Afk**\n\n**Afk Olan Kullanıcı :** \`${USER.tag}\`\n**Afk Süresi :** \`${timeObj.hours}saat\` \`${timeObj.minutes}dakika\` \`${timeObj.seconds}saniye\`\n**Sebep :** \`${REASON}\``);

    message.channel.send(shewnafk);
  }
});




client.on("message", async message => {
    const ExcuvateSA = message.content.toLocaleLowerCase();
  
    if (
      ExcuvateSA === "selam" ||
      ExcuvateSA === "Selam" ||
      ExcuvateSA === "sa" ||
      ExcuvateSA === "Sa" ||
      ExcuvateSA === "SA" ||
      ExcuvateSA === "selamün aleyküm" ||
      ExcuvateSA === "Selamun aleyküm" ||
      ExcuvateSA === "slm" ||
      ExcuvateSA === "sea"
    ) {
      let e = await db.fetch(`sa-as_${message.guild.id}`);
      if (e === "acik") {
        
        let mesajj = await message.reply("``Aleyküm Selam, Hoş Geldin Dostum``")
        mesajj.react("🧡")
      }
    }
  });




  client.on('guildMemberAdd', async member => {

    const dbNotTag = require('quick.db')
    let guild = member.guild; 
    let user = guild.members.cache.get(member.id);
    
    const tag = await dbNotTag.fetch(`banned-tag.${guild.id}`)
    const sayı = await dbNotTag.fetch(`atıldın.${guild.id}.${user.id}`)
    if(user.user.username.includes(tag)) {
      
    if(sayı === null) {
    await dbNotTag.add(`atıldın.${guild.id}.${user.id}`, 1)
    user.send(new Discord.MessageEmbed()
    .setColor('RED')
    .setAuthor(guild.name, guild.iconURL)
    .setDescription(`Sunucumuzun yasaklı tagında bulunduğunuz için atıldınız, tekrar giriş yapmayı denerseniz **yasaklanacaksınız**!`))
    await user.kick() }
    
    if(sayı === 1) {
    await dbNotTag.delete(`atıldın.${guild.id}.${user.id}`)
    user.send(new Discord.MessageEmbed()
    .setColor('RED')
    .setAuthor(guild.name, guild.iconURL)
    .setDescription(`Sunucumuzun yasaklı tagında bulunduğunuz zaten için atılmıştınız, tekrar giriş yapmayı denediğiniz için **${guild.name}** sunucusundan kalıcı olarak **yasaklandınız**!`))
    await user.ban() } }
      
    })


client.login(config.token).then(() => console.log(chalk.green`[Shewn? Supervisor] ${client.user.tag} olarak giriş yaptı!`)).catch(() => console.log(chalk.red`[Shewn? Supervisor] Bot giriş yapamadı!`));
// POWERED BY SHEWN?