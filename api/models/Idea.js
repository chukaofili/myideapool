/**
 * Idea.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    content: {
      type: 'string',
      required: true
    },
    impact: {
      type: 'number',
      min: 1,
      max: 10,
      required: true,
    },
    ease: {
      type: 'number',
      min: 1,
      max: 10,
      required: true,
    },
    confidence: {
      type: 'number',
      min: 1,
      max: 10,
      required: true,
    },
    user: {
      model: 'user',
      required: true
    }
  },

};

