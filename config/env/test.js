module.exports = {
  datastores: {
    default: {
      adapter: 'sails-disk',
    },

  },
  models: {
    migrate: 'drop',
    dataEncryptionKeys: {
      default: 'TEST'
    },
    attributes: {
      createdAt: { type: 'number', autoCreatedAt: true, },
      updatedAt: { type: 'number', autoUpdatedAt: true, },
      id: { type: 'number', autoIncrement: true, },
    },
  },
  blueprints: {
    shortcuts: false,
  },
  security: {
    cors: {
      allRoutes: true,
      allowOrigins: '*',
      allowCredentials: false
    }
  },
  session: {
    secret: 'SECRET',
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  },

  sockets: {
  },
  log: {
    level: 'warn'
  },

  hooks: {
    grunt: false
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000,
  },

  // port: 80,
  custom: {
    baseUrl: 'https://localhost:5000',
    internalEmailAddress: 'ofili@microsmart.tk',
  },
};
