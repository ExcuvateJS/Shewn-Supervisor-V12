const { MessageEmbed } = require("discord.js");
const Config = require("../Config.json");
const db = require("quick.db")
const kdb = new db.table("kullanıcı");


exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(Config.Staff.VoiceMuteStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(Config.Emoji.Çarpı)
    let embed = new MessageEmbed().setColor('RANDOM')

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.channel.send(embed.setDescription(`${message.author} kimin mutesini kaldıracağını yazmadın! \`!unvmute @Shewn/ID\``).setTimestamp().setFooter(Config.Bots.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (!user.voice.channel) return message.react(Config.Emoji.Çarpı)
    if (user.id === message.author.id) return message.react(Config.Emoji.Çarpı)
    if (user.id === client.user.id) return message.react(Config.Emoji.Çarpı)
    if (user.hasPermission(8)) return message.react(Config.Emoji.Çarpı)


    let data = await kdb.get(`durum.${user.id}.vmute`)
    if (!data) return message.channel.send(embed.setDescription(`Kullanıcı zaten muteli değil.`).setFooter(Config.Bots.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    if (data) {
        await kdb.delete(`durum.${user.id}.vmute`)
        user.voice.setMute(false).catch()
        message.react(Config.Emoji.Onay)
        client.channels.cache.get(Config.Logs.VmuteLogID).send(embed.setDescription(`${user} kullanıcısının **voice-mute** cezası ${message.author} tarafından kaldırıldı.`).setTimestamp().setFooter(Config.Bots.footer))}}

        exports.conf = {
            enabled: true,
            guildOnly: false,
            aliases: ["un-vmute"],
            permLevel: 0
          };
           
          exports.help = {
            name: 'unvmute',
            cooldown: 5
          };