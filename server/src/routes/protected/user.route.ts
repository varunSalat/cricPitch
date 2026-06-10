import { Router } from "express";
import { UserController } from "../../controllers";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get Logged In User Profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 72808db7-b550-4716-8cc0-b81b9ca1b080
 *                 name:
 *                   type: string
 *                   example: Varun Patel
 *                 email:
 *                   type: string
 *                   example: varun@gmail.com
 *                 phoneNumber:
 *                   type: string
 *                   example: "9876543210"
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authenticate, userController.getMe);

export default router;
