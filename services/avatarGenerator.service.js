const AvatarGenerator = require('avatar-generator');
const { config, tempPath } = require('./config');

const avatar = new AvatarGenerator({
  parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'], //order in which sprites should be combined
  partsLocation: config.pathToSprites, // path to sprites
  imageExtension: '.png'
})
const variant = 'male'

const avatarGenerator = async (id) => {
  const img = await avatar.generate(id, variant);
  const pathToTmpDir = await tempPath(id)
  await img.png().toFile(pathToTmpDir);
  return pathToTmpDir
}

module.exports = {
  avatarGenerator
}