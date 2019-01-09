const Joi = require('joi');

module.exports = {
  signUp(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      name: Joi.string(),
      password: Joi.string().min(4),
    };

    const {error, value} = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid eMail address.'
          });
          break;
        case 'password':
          res.status(400).send({
            error: 'You must provide a password with a minimum length of 4 characters.'
          });
          break;
        default:
          res.status(400).send({
            error: 'Invalid sign up information.'
          });
      }
    } else {
      next();
    }
  }
};
