const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const prisma = require('../db/prisma')

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return done(null, false, { message: 'Incorrect username' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return done(null, false, { message: 'Incorrect password' });

  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});
