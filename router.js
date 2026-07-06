const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/movies/:movieName", controller.movieGet);
router.get("/directors/:directorName", controller.movieByDirectorGet);

module.exports = router;
