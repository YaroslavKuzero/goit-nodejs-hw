const AvatarGenerator = require('avatar-generator');
const path = require('path');


const avatar = new AvatarGenerator({
  parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'], //order in which sprites should be combined
  partsLocation: path.join(__dirname, '../node_modules/avatar-generator/img'), // path to sprites
  imageExtension: '.png'
})
const variant = 'male'

const avatarGenerator = async (id) => {
  const img = await avatar.generate(id, variant);
  await img.png().toFile(`tmp/${id}.png`);
  return `tmp/${id}.png`
}

module.exports = {
  avatarGenerator
}