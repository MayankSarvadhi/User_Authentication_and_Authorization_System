require("dotenv").config();
const db = require("../models/index.Model");
const UserModel = db.UserModel;
const AuthModel = db.AuthModel;
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async function (jwtPayload, done) {
  const isAuth = await AuthModel.findOne({ where: { userID: jwtPayload.id } });

  if (isAuth) {
    try {
      const user = await UserModel.findByPk(jwtPayload.id);
      if (user) {
        return done(null, user);
      }
    } catch (error) {
      return done(error, false);
    }
  } else {
    return done(null, false);
  }
}));

module.exports = passport;
