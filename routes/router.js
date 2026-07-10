const { Router } = require("express");
const controller = require("../controllers/controller");
const movieController = require("../controllers/movieController");
const directorController = require("../controllers/directorController");
const router = Router();

router.get("/new", controller.formGet);
router.post("/new", controller.addMoviePost);
router.get("/movies/:movieName", controller.movieGet);
router.get("/directors/:directorName", controller.movieByDirectorGet);
router.get("/", controller.homePageGet);
router.get("/newDirector", controller.directorFormGet);
router.post("/newDirector", controller.addDirectorPost);
router.get("/deleteMovie", movieController.deleteMovieGet);
router.post("/deleteMovie", movieController.deleteMoviePost);
router.get("/deleteDirector", directorController.deleteDirectorGet);
router.post("/deleteDirector", directorController.deleteDirectorPost);

module.exports = router;
