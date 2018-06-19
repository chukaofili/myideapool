/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    email: {
      type: 'string',
      isEmail: true,
      unique: true,
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    ideas: {
      collection: 'idea',
      via: 'user'
    },
  },
  customToJSON: function() {
    return _.omit(this, ['password']);
  },
  beforeCreate: (valuesToSet, proceed) => {
    sails.helpers.passwords.hashPassword(valuesToSet.password).exec((err, hashedPassword) => {
      if (err) { return proceed(err); }
      valuesToSet.password = hashedPassword;
      return proceed();
    });
  }

};

