const { MessageEmbed } = require('discord.js');
const data = require('quick.db');
const ms = require('ms');
const moment = require('moment')
const Config = require('../Config.json')


module.exports.run = async (client, message, args) => {
  

if (!message.member.roles.cache.has(Config.Staff.JailStaff) && !message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
 
const muterol = message.guild.roles.cache.find(r => r.id === (Config.Roles.CmuteRolID))


let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!member) return message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`${message.author},lütfen bir kullanıcı belirt @Shewn/ID`)).then(x => x.delete({timeout: 5000}));
  
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor('RANDOM').setDescription(`${message.author}, lütfen bir kullanıcı belirt @Shewn/ID`).then(x => x.delete({timeout: 5000}));
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
{
        return message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda Olabilir.`)).then(x => x.delete({timeout: 5000}));
} else {
let sebep = args[1]
if(!sebep) return message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`Lütfen Bir sebep belirtiniz.`))  .then(x => x.delete({timeout: 5000}));
  

message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`${member} Kişisinin Mutesi ${message.author} Tarafından __${sebep}__ sebebiyle kaldırıldı.`)).then(x => x.delete({timeout: 5000}));
mute.roles.remove(muterol)
message.react((Config.Emoji.Onay))
} 


      }}
      exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["un-mute"],
        permLevel: 0
      };
       
      exports.help = {
        name: 'unmute',
        cooldown: 5
      };