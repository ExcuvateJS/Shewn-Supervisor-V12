const Discord = require("discord.js")
const Config = require('../Config.json')

exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send("Bir ses kanalında olman gerek")
    let Kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(message.channel.id !== kanallar.botkomutkanalı) return message.channel.send(`<#${Config.Channels.BotKomut}>`).then(msg => {msg.delete({timeout: 10000})})

    if (!Kullanıcı) return message.channel.send("Kullanıcı belirtmedin")
    if (message.member.voice.channel === Kullanıcı.voice.channel) return message.channel.send("Zaten aynı kanaldasınız")
    const filter = (reaction, user) => {
        return [Config.Emoji.Onay, Config.Emoji.Çarpı].includes(reaction.emoji.id) && user.id === Kullanıcı.id;
    };
    let ExcuvateJSON = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(`${Kullanıcı},, ${message.author} **Adlı Kullanıcı Bulunduğunuz Ses Odasına Gelmek İstiyor Kabul Ediyormusunuz**`)
        
    let ExcuvateReaction = await message.channel.send(ExcuvateJSON)
    await ExcuvateReaction.react(Config.Emoji.Onay)
    await ExcuvateReaction.react(Config.Emoji.Çarpı)
    ExcuvateReaction.awaitReactions(filter, {
        max: 1,
        time: 60000,
        errors: ['time']
    }).then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.id === Config.Emoji.Onay) {
            let shewn = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${Kullanıcı} Kullanıcı Bulunduğunuz Odaya Giriş Yaptı`)
            message.channel.send(shewn)
            message.member.voice.setChannel(Kullanıcı.voice.channel)
            ExcuvateReaction.delete()
        } else {
            let ExcuvateRedd = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${Kullanıcı} Kullanıcı Odaya Gitmenize Kabul Etmedi`)
            message.channel.send(ExcuvateRedd)
            ExcuvateReaction.delete()
        }
    })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
   
  exports.help = {
    name: 'git',
    cooldown: 5
  };