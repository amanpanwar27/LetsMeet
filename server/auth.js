const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const GOOGLE_CLIENT_ID =
  "235122979277-rig0g3fg3gfr3rcu8lt7qmbudbaci5vh.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/join-room",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
