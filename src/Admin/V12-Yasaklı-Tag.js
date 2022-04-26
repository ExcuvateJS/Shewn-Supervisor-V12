const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../Config.json");

exports.run = async (client, message, args) => { 

let prefix = await db.fetch(`prefix.${message.guild.id}`) || config.prefix
if(!message.member.roles.cache.has(config.Staff.OwnerStaff)) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip değilsin.')
  
if(!args[0]) return message.channel.send(`**Yasaklı tag sistemini kullanabilmek için: ${prefix}yasaklı-tag** **ekle** \`tag\` **yazmalısın.**`)
let argümanlar = ['ekle', 'çıkar']
if(!argümanlar.includes(args[0])) return message.channel.send(`**Sadece ${prefix}yasaklı-tag** \`ekle\` **/** \`çıkar\` **kullanabilirsin.**`)
  
if(args[0] === 'ekle') {
  
const tag = await db.fetch(`banned-tag.${message.guild.id}`)
if(tag) return message.channel.send("`Hiç tag eklememişsin.`")
if(!args[1]) return message.channel.send("`Bir tag belirtmelisin.`")
  
await db.set(`banned-tag.${message.guild.id}`, args[1])
  
message.channel.send(new Discord.MessageEmbed()
.setDescription(` \`${args[1]}\` **tagı yasaklı olarak listeye eklendi.** `)
.setColor('GREEN')
.setAuthor(message.author.username, message.author.avatarURL)) 
}
  
  
if(args[0] === 'çıkar') {
  
const tag = await db.fetch(`banned-tag.${message.guild.id}`)
if(!tag) return message.reply("`Hiç tag eklememişsin.`")
if(!args[1]) return message.reply("`Bir tag belirtmelisin.`")
  
await db.delete(`banned-tag.${message.guild.id}`)
  
message.channel.send(new Discord.MessageEmbed()
.setDescription(`**${args[1]}** tagı artık yasaklı değil..`)
.setColor('GREEN')
.setAuthor(message.author.username, message.author.avatarURL)) 
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yasaklıtag', 'nottag'],
    permLevel: 0,
    }
    
    exports.help = {
    name: 'yasaklı-tag',
    cooldown: 5
    }