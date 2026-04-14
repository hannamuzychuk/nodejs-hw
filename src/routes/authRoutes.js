import { Router } from "express";
import { celebrate } from 'celebrate';
import { registerUser, loginUser, refreshUserSession, logoutUser } from "../controllers/authController.js";
import { registerUserSchema, loginUserSchema, requestResetEmailSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema ), loginUser);
router.post('/auth/refresh', refreshUserSession);
router.post('/auth/logout', logoutUser);
router.post('/auth/reset', celebrate(requestResetEmailSchema), requestResetEmail);
router.post('/auth/reset-password',celebrate(resetPasswordSchema),resetPassword);

export default router;
