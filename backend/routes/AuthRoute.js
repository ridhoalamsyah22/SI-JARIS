const express    = require("express");
const auth       = require("../controllers/Auth.js");
const middleware = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/', middleware.verifyUser, auth.Me);

router.post('/register', auth.Register);
router.post('/login', auth.Login);
router.get('/logout', auth.Logout);

module.exports = router;