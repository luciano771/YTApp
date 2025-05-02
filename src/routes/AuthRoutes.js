import { Router } from "express";
import passport from "passport";  

const router = Router();

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],   
    session: false
  })
);
  
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => { 
    res.json({
      message: "Autenticación exitosa",
      user: req.user
    }); 
  }
);

 
export default router;
