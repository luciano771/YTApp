import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UsersModel from "../models/UsersModel.js";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/Auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  console.log("givenName:", profile?.name?.givenName);   
  console.log("firstName:", profile?.name?.familyName);
  console.log("email:", profile?.emails[0]?.value);
  console.log("_idUser:", profile?.id);

  const UserDataNotification = {
    _idUser: profile?.id, 
    givenName: profile?.name?.givenName,      
    familyName: profile?.name?.familyName,    
    email: profile?.emails?.[0]?.value       
  };
  var exist = await UsersModel.getUser(profile?.id);
  if(!exist)
  {
    UsersModel.create(UserDataNotification);
  } 
  console.log(exist);
  return done(null, {
    _idUser: profile?.id, 
    givenName: profile?.name?.givenName,      
    familyName: profile?.name?.familyName,    
    email: profile?.emails?.[0]?.value,
    photo: profile?.photos?.[0]?.value      
  });

}));

 