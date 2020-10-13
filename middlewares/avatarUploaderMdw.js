const { func } = require('joi');
const { diskStorage } = require('multer');
const multer = require('multer');

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
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