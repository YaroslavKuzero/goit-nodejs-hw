const createAvaURL = (id) => {
  return `http://localhost:3000/images/avatar-${id}.png`
}

const tempPath = (id) => {
  return `tmp/${id}.png`
}

const createAvaDB = (filename) => {
  return `http://localhost:3000/images/${filename}`
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
