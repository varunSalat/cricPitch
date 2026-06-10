import { Router } from "express";
import { UserController } from "../../controllers";
import { validate } from "../../middlewares";
import { registerSchema, loginSchema } from "../../validations/auth.validation";

const router = Router();

const userController = new UserController();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phoneNumber
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Varun Patel
 *               email:
 *                 type: string
 *                 example: varun@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", validate(registerSchema), userController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: varun@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", validate(loginSchema), userController.login);

export default router;
