const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../Config.json")
let prefix = ayarlar.prefix
 
module.exports.run = function(client, message, args) { 
  var ExcuvateMember = message.author;
  var ExcuvateReason = args.slice(0).join("  ");
  const embed = new Discord.MessageEmbed()
  .setColor('RED')
  .setAuthor(message.author.username, message.author.avatarURL)
  .setDescription(`**Lütfen geçerli bir sebep girin.**\n \`Örnek : ${prefix}afk <sebep>\``)
 
  if(!ExcuvateReason) return message.channel.send(embed)
  db.set(`afk_${ExcuvateMember.id}`, ExcuvateReason);
  db.set(`afk_süre_${ExcuvateMember.id}`, Date.now());
  const afk = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setAuthor(message.author.username, message.author.avatarURL)
  .setDescription(`Başarıyla afk moduna girildi. Afk olma sebebi : **${ExcuvateReason}**`)
  
  message.channel.send(afk) 
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['afk'],
    permLevel: 0
  };
  exports.help = {
    name: 'afk',
    cooldown: 5
  };