const { Router } = require("express");
const controller = require("./controller/controller");
const router = Router();

router.get("/new", controller.formGet);
router.get("/movies/:movieName", controller.movieGet);
router.get("/directors/:directorName", controller.movieByDirectorGet);

module.exports = router;
