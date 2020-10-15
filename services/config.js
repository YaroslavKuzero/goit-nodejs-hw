const createAvaURL = async (id) => {
  return await `http://localhost:3000/images/avatar-${id}.png`
}

const tempPath = async (id) => {
  return await `tmp/${id}.png`
}

const createAvaDB = async (filename) => {
  return await `http://localhost:3000/images/${filename}`
}

const config = {
  staticURL: 'public/images',
  hostURL: 'http://localhost:3000/',
  defaultAvatarImg: 'https://cdn.dribbble.com/users/205420/screenshots/4188067/users.png',
  pathToSprites: 'node_modules/avatar-generator/img',
  senderEmail: 'yarikkuzero@gmail.com'
}
module.exports = {
  createAvaURL,
  config,
  tempPath,
  createAvaDB
}
