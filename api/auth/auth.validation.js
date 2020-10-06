const Joi = require('joi');

const registrationSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required(),

  password: Joi
    .string()
    .pattern(/^[a-zA-Z0-9]{8,16}$/)
    .required()
    .error(errors => {
      errors.forEach(err => {
        console.log(err);
        if (err.code === 'string.pattern.base') {
          err.message = '\'password\' is not valid'
        }
      })
      return errors;
    })
});

const validationMiddleware = async (req, res, next) => {
  try {
    await registrationSchema.validateAsync(req.body);
    next();
  }
  catch (err) {
    res.status(400).send(err.details);
  }
}

module.exports = validationMiddleware;