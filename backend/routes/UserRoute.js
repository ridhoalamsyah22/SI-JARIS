const express       = require("express");
const user          = require("../controllers/User.js");
const middleware    = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/user', middleware.adminOnly, user.getAllData);
router.post('/user/store', middleware.adminOnly, user.Store);
router.get('/user/show/id', middleware.adminOnly, user.getDataById);
router.put('/user/update/:id', middleware.adminOnly, user.Update);
router.delete('/user/destroy/:id', middleware.adminOnly, user.Destroy);

module.exports = router;