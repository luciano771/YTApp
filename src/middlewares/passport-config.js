import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const emails = ["pereyraluciano771@gmail.com"];

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/Auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile?.emails?.[0]?.value;

    if (!email) {
      console.error("No se pudo obtener el email del perfil de Google");
      return done(null, false, { message: "Email no disponible" });
    }

    const isAuthorized = emails.includes(email);

    if (isAuthorized) {
      return done(null, profile);
    } else {
      emails.push(email);
      return done(null, profile);
    }
  } catch (err) {
    console.error("Error en la estrategia de Google:", err);
    return done(err, false, { message: "Error interno en autenticación" });
  }
}));

passport.serializeUser((user, done) => {
  try {
    done(null, user);
  } catch (err) {
    console.error("Error en serializeUser:", err);
    done(err);
  }
});

passport.deserializeUser((obj, done) => {
  try {
    done(null, obj);
  } catch (err) {
    console.error("Error en deserializeUser:", err);
    done(err);
  }
});
