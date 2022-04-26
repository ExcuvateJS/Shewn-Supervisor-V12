const config = require('../Config.json')

module.exports.run = async(client, message, args) => {
    //Bu Kod Shewn?#2504 Tarafından Yapılmıştır Çalmayın Kullanın :)
    
    if(!message.member.roles.cache.has(config.Staff.OwnerStaff)) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip değilsin.')
    
    let miktar = Number (args[0])
    let KANAL = message.channel
    
    if(isNaN(miktar)) return KANAL.send(`⚠️**Geçersiz sayı. 0 ile 6 saat arasında değer girmeyi dene.**`).then(message.react("⚠️"))
    
    KANAL.setRateLimitPerUser(miktar)
      message.react("✅")
      KANAL.send(`✅ Tamamdır! Yavaş Modu ayarladım.`)
    
    };

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['slowmode', 'yavaşmod'],
        permLevel: 0,
        }
        
        exports.help = {
        name: 'slow-mode',
        cooldown: 5
        }