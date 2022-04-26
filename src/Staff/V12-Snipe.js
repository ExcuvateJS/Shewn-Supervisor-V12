const Discord = require('discord.js');
const databaseSnipe = require('quick.db');
const config = require('../Config.json')

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.has(config.Staff.AbalityStaff)) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip değilsin.')

  if(!databaseSnipe.fetch(message.guild.id) || databaseSnipe.fetch(message.guild.id).length <= 0) return createEmbed('Daha önce hiç mesaj silinmemiş.', 'RED');
  if(!args[0]) return createEmbed('Bir sayı belirtmelisin.', 'RED');
  if(isNaN(args[0])) return createEmbed('Bir sayı belirtmelisin.', 'RED');
  if(args[0] > databaseSnipe.fetch(message.guild.id).length) args[0] = databaseSnipe.fetch(message.guild.id).length;


  var silinenler = databaseSnipe.fetch(message.guild.id).slice(databaseSnipe.fetch(message.guild.id).length-args[0]);

  const embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setDescription(silinenler.sort((a, b) => a.messageCREATEDAT - b.messageCREATEDAT).reverse().map(x => `**${x.authorTAG}**: ${x.messageCONTENT}`).slice(0, 50).join('\n'))
  .setTitle('hm, tüm silinenler');
  if(embed.description.length > 1000) return createEmbed('Silinen mesajların arasında çok uzun bir mesaj bulunduğu için bunu gösteremiyorum.', 'RED');

  return message.channel.send(embed);

  function createEmbed(desc, color) {
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription(desc)
    .setColor(color)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, size: 2048 })));
  }

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'snipe',
  cooldown: 5
};