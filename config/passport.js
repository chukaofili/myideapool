const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, {message: 'Email account not found.'});
  }
  await sails.helpers.passwords.checkPassword(password, user.password)
  .intercept('incorrect', () => {
    return done(null, false, { message: 'Invalid password' });
  });

  return done(null, user);
}));
