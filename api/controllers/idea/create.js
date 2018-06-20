module.exports = {
  friendlyName: 'Create Idea.',
  description: 'Create an idea.',
  inputs: {
    content: {
      friendlyName: 'Idea content.',
      description: 'The main content idea to create.',
      type: 'string',
      example: 'Create electro stimulant light bulbs',
      required: true
    },
    impact: {
      type: 'number',
      friendlyName: 'Idea impact.',
      description: 'The impact of the idea to create.',
      example: 2,
      min: 1,
      max: 10,
      required: true,
    },
    ease: {
      type: 'number',
      friendlyName: 'Idea ease.',
      description: 'The ease of the idea to create.',
      example: 2,
      min: 1,
      max: 10,
      required: true,
    },
    confidence: {
      type: 'number',
      friendlyName: 'Idea confidence.',
      description: 'The confidence of the idea to create.',
      example: 2,
      min: 1,
      max: 10,
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      friendlyName: 'Created idea',
      description: 'Created idea.',
      outputExample: {
        'id': 1,
        'content': 'the-content',
        'impact': 8,
        'ease': 8,
        'confidence': 8,
        'average_score': 8.0,
        'user': 23,
        'created_at': 1529485206287,
        'updated_at': 1529485206287
      }
    },
    invalid: {
      statusCode: 400,
      description: 'Invalid request.',
    }
  },
  fn: async function (inputs, exits) {
    const { impact, ease, confidence } = inputs;
    inputs.average_score = _.mean([impact, ease, confidence]).toFixed(2); //eslint-disable-line
    inputs.user = this.req.user.id;
    const idea = await Idea.create(inputs)
      .intercept({ name: 'UsageError' }, (err) => { return { invalid: err }; })
      .fetch();
    return exits.success(idea);
  }
};
