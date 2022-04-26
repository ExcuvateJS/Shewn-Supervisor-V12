const { MessageEmbed } = require("discord.js")
const Config = require("../Config.json")
const db = require("quick.db")
const kdb = new db.table("kullanıcı")

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(Config.Emoji.Çarpı)
    let embed = new MessageEmbed().setColor('RANDOM')

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(member)
    kdb.delete(`sicil.${user.id}`)
    kdb.delete(`cezapuan.${user.id}`)
    message.react(Config.Emoji.Onay)}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sicil-temizle", "sicil-sil", "data-sil", "data-sıfırla"],
    permLevel: 0
  };
   
  exports.help = {
    name: 'siciltemizle',
    cooldown: 5
  };