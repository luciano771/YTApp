import { Router } from "express";
import passport from "passport";  

const router = Router();

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/contacts', 'https://www.google.com/m8/feeds/'], session: false })
);

router.get('/google/callback',
  (req, res) => {
    // Login exitoso
    res.send("Login exitoso con Google");
  }
);

export default router;
