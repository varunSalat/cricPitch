import { Router } from "express";
import { PitchController } from "../../controllers";

const router = Router();

const pitchController = new PitchController();

/**
 * @swagger
 * /pitches:
 *   get:
 *     summary: Get All Pitches
 *     tags:
 *       - Pitches
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         example: Champions
 *     responses:
 *       200:
 *         description: List of pitches
 */
router.get("/", pitchController.getPitches);

/**
 * @swagger
 * /pitches/{id}:
 *   get:
 *     summary: Get Pitch Details
 *     tags:
 *       - Pitches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a280a823a1071f9493aeaac
 *     responses:
 *       200:
 *         description: Pitch details
 *       404:
 *         description: Pitch not found
 */
router.get("/:id", pitchController.getPitchById);

export default router;
