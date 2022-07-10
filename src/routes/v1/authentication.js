const express = require("express");

const {
    register, login, updateProfile, deleteProfile, deactivateProfile, reactivateProfile, changePassword,
    resetPassword, changePin, resetPin, verifyProfile, logout, logoutAll, resendOTP, verifyLoginOTP, getProfile
} = require("../../controllers/v1/authentication");
const {authenticate} = require("../../middleware/v1/authenticate");

const router = express.Router({mergeParams: true});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/logoutAll', authenticate, logoutAll);
router.put('/profile', authenticate, updateProfile);
router.get('/profile', authenticate, getProfile);
router.put('/profile/:token', verifyProfile);
router.delete('/profile', authenticate, deleteProfile);
router.delete('/profile/freeze', authenticate, deactivateProfile);
router.put('/profile/activate', reactivateProfile);
router.put('/passwords/change', authenticate, changePassword);
router.put('/passwords/reset', resetPassword);
router.post('/otp/resend', resendOTP);
router.post('/otp/:token/verify', verifyLoginOTP);

module.exports = router;