const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../Config.json')
let prefix = config.prefix

exports.run = (client, message, args) => {
if(!message.member.roles.cache.has(config.Staff.OwnerStaff)) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip değilsin.')
const Excuvate = args.join(` `);
  if(!Excuvate) message.channel.send(new Discord.MessageEmbed()
  .addField("Hatalı Kullanım",`Örnek Kullanım: **${prefix}sa-as aç & kapat**`)
  .setColor("ff0000")
 )
if(Excuvate === "aç") {
db.set(`sa-as_${message.guild.id}`, `acik`);
message.channel.send(new Discord.MessageEmbed()
  .addField("İşlem Başarılı",`Sa-As Sistemi Başarılı Bir Şekilde Açıldı`)
  .setColor("00ff00")
  )
}
else if(Excuvate === "kapat") {
db.set(`sa-as_${message.guild.id}`, `kapali`);
message.channel.send(new Discord.MessageEmbed()
  .addField("İşlem Başarılı",`Sa-As Sistemi Başarılı Bir Şekilde Kapatıldı`)
  .setColor("00ff00")
  )
}
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['saas'],
    permLevel: 0,
    }
    
    exports.help = {
    name: 'sa-as',
    cooldown: 5
    }