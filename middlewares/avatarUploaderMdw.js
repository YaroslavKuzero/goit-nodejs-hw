const multer = require('multer');
const { config } = require('../services/config');

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.staticURL)
    },
    filename: function (req, file, cb) {
      cb(null, `avatar-${req.user.id}.png`)
    }
  })

  return multer({ storage }).single('avatar')
}

module.exports = {
  avatarUploaderMdw: avatarUploader()
}