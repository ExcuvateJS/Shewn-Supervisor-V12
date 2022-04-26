const config = require('../Config.json')
module.exports = client => {
    client.user.setPresence({ activity: {name: config.Bots.activity}, type: config.Bots.type, status: config.Bots.status})
    client.channels.cache.get(config.Bots.VoiceChannel).join(config.Bots.voicechannel)
  }