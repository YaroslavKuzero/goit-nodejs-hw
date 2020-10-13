const createAvaURL = async (id) => {
  return await `http://localhost:3000/images/avatar-${id}.png`
}

module.exports = {
  createAvaURL,
}
