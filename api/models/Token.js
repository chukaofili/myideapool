/**
 * Token.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    uuid: {
      type: 'string',
      required: true
    },
    token: {
      type: 'string',
      required: true
    }
  }
};
