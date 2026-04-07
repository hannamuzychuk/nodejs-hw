import { Router } from "express";
import { celebrate } from 'celebrate';
import { registerUser, loginUser } from "../controllers/authController";
import { registerUserSchema, loginUserSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/register', celebrate(registerUserSchema), registerUser);
router.post('/login', celebrate({ [Segments.BODY]: loginUserSchema }), authController.loginUser);

export default router;