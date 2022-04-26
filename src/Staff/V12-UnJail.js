const ms = require('ms')
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const kdb = new db.table("kullanıcı")
const moment = require("moment")
const Config = require("../Config.json")


exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(Config.Staff.JailStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(Config.Emoji.Çarpı)
    let embed = new MessageEmbed().setColor('RANDOM')

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.channel.send(embed.setDescription(`${message.author} kimin yasağını kaldıracağını yazmadın! \`!unjail @Shewn/ID\``).setTimestamp().setFooter(Config.Bots.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    if (user.id === message.author.id) return message.react(Config.Emoji.Çarpı)
    if (user.id === client.user.id) return message.react(Config.Emoji.Çarpı)
    if (user.hasPermission(8)) return message.react(Config.Emoji.Çarpı)

    let data = await kdb.get(`durum.${user.id}.jail`)
    if (!data) return message.react(Config.Emoji.Çarpı)
    user.roles.set([Config.Roles.UnregisterRolID])
    kdb.delete(`durum.${user.id}.jail`)

    client.channels.cache.get(Config.Logs.JailLogID).send(embed.setDescription(`${user} kullanıcısının **karantina** cezası ${message.author} tarafından kaldırıldı.`).setTimestamp().setFooter(Config.Bots.footer))}

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["un-jail"],
        permLevel: 0
      };
       
      exports.help = {
        name: 'unjail',
        cooldown: 5
      };