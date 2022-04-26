const reqEvent = event => require(`../Util/${event}`);
const control = (ct) => require(`../Util/Control/${ct}`)

module.exports = client => {
  client.on('message', reqEvent('message'));
  client.on('ready', () => reqEvent('ready')(client));
  client.on('ready', control('Ceza-Kontrol'))
};