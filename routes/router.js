const { Router } = require("express");
const controller = require("../controller/controller");
const router = Router();

router.get("/new", controller.formGet);
router.post("/new", controller.addMoviePost);
router.get("/movies/:movieName", controller.movieGet);
router.get("/directors/:directorName", controller.movieByDirectorGet);
router.get("/", controller.homePageGet);
router.get("/newDirector", controller.directorFormGet);
router.post("/newDirector", controller.addDirectorPost);
router.get("/deleteMovie", controller.deleteMovieGet);

module.exports = router;
