const Discord = require('discord.js')
const config = require('../Config.json') //Kendinize göre ayarlarsınız
let prefix = config.prefix //Kendinize göre ayarlarsınız

module.exports.run = async (client, message, args) => { 
  let KANAL = message.channel

  //Bu Kod Shewn?#2504 Tarafından Yapılmıştır Çalmayın Kullanın :)

  if(!message.member.roles.cache.has(config.Staff.AbalityStaff)) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip değilsin.')
  if (!args[0] || isNaN(args[0])) {
  const purged = new Discord.MessageEmbed() 
  .addField("Hatalı Kullanım",`Örnek Kullanım: **${prefix}purge 10**`)
  .setColor("ff0000")

  return KANAL.send(purged)
  }
  message.delete();
  let delsayi = Number(args[0]);
  let deleted = 0;
  for (var i = 0; i < (Math.floor(delsayi/100)); i++) {
  KANAL.bulkDelete(100).then(r => deleted+=r.size);
  delsayi = delsayi-100; 
  };
  if (delsayi > 0)  KANAL.bulkDelete(delsayi).then(r => deleted+=r.size);

  const purge = new Discord.MessageEmbed()  
  .setColor("00ff00")
  .addField("İşlem Başarılı",`**\`\`${args[0]}\`\` Adet Mesaj Silindi.**`)
  
  return KANAL.send(purge)
  }

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sil', 'temizle', 'clear'],
    permLevel: 0,
    }
    
    exports.help = {
    name: 'purge',
    cooldown: 5
    }