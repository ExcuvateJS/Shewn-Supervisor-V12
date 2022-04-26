const { MessageEmbed } = require("discord.js");
const Config = require("../Config.json")

exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.get(Config.Staff.BanStaff) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(Config.Emoji.Çarpı)
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp();
  if (!args[0] || isNaN(args[0])) return message.channel.send(embed.setDescription("Geçerli bir kişi ID'si belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  let kisi = await client.users.fetch(args[0]);
  if(kisi) {
    let reason = args.splice(1).join(" ") || "sebep belirtilmedi";
    message.guild.members.unban(kisi.id).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));

    if(Config.Logs.BanLogID && client.channels.cache.has( Config.Logs.BanLogID)) client.channels.cache.get( Config.Logs.BanLogID).send(new MessageEmbed().setColor('RANDOM').setTimestamp().setTitle('Ban Kaldırıldı!').setDescription(`**Kaldıran Yetkili:** ${message.author} (${message.author.id})\n**Banı Kaldırılan Üye:** ${kisi.tag} (${kisi.id})`));
  } else {
    message.channel.send(embed.setDescription("Geçerli bir kişi ID'si belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    message.channel.send(embed.setDescription("Kullanıcının Banı Açıldı Sunucuya Giriş Yapabilir.")).then(x => x.delete({timeout: 5000}));

  };
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["un-ban"],
    permLevel: 0
  };
   
  exports.help = {
    name: 'unban',
    cooldown: 5
  };