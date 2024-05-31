const express       = require("express");
const barang        = require("../controllers/Barang.js");
const middleware    = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/barang', middleware.adminOnly, barang.getAllData);
router.post('/barang/store', middleware.adminOnly, barang.Store);
router.get('/barang/show/id', middleware.adminOnly, barang.getDataById);
router.put('/barang/update/:id', middleware.adminOnly, barang.Update);
router.delete('/barang/destroy/:id', middleware.adminOnly, barang.Destroy);

module.exports = router;