const router = require("express").Router();
const adminController = require("../controller/adminController")
const auth = require("../middleware/auth")

router.get("/login", adminController.viewLogin)
router.post("/login", adminController.actionLogin)
router.get("/logout", adminController.actionLogout)

router.get("/register", adminController.viewRegister)
router.post("/register", adminController.actionRegister)
router.get("/isibiodata", adminController.viewIsiBiodata)
router.get("/isibiodata/:username/:fullname/:age", adminController.actionIsiBiodata)

router.get("/dashboard", adminController.viewDashboard)

router.get("/game", adminController.viewGameGBK)

router.get("/biodata", adminController.viewBiodata)
router.get("/biodata/update", adminController.viewActionBiodata)
router.post("/biodata/update", adminController.ActionBiodata)

router.get("/histori", adminController.viewHistory)
router.get("/delete", adminController.deleteAccount)

module.exports = router