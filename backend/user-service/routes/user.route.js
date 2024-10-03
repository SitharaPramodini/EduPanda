const express = require("express");
const { logout, getAllUsers, loginStatus, updateUser, changePassword, forgotPassword, resetPassword} = require("../controller/user.controller");
const protect = require("../middleware/auth.middleware");
const router = express.Router();
const UserController = require('../controller/user.controller');

router.post("/register", UserController.registerrUser);
router.post("/register/instructor", UserController.registerrInstructor);
router.post("/login", UserController.loginUser);
router.get("/logout",  UserController.logout);
router.get("/getuser", UserController.verifyToken, UserController.getUser);
router.get("/enrolledCourses",  UserController.verifyToken, UserController.getEnrolledCourses);
router.get("/AsignedCourses",  UserController.verifyToken, UserController.getInstructorCourses);

router.put("/updateuser", UserController.verifyToken, UserController.updateUser);
router.patch("/changepassword", UserController.verifyToken, UserController.changePassword);
router.post("/forgotpassword", UserController.forgotPassword);
router.put("/resetpassword/:resetToken", UserController.resetPassword);

router.post("/verify-otp", UserController.verifyOTP);
// router.get("/loggedin", loginStatus);
// router.get("/all", getAllUsers); // This will handle GET requests to /api/users/all
// router.patch("/updateuser", protect, updateUser);
// router.patch("/changepassword", protect, changePassword);
// router.post("/forgotpassword", forgotPassword);
// router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;

