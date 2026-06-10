import { Request, Response } from "express";
import { asyncHandler, ApiResponse, AppError } from "../utils";
import { PitchService } from "../services";

export class PitchController {
  private pitchService = new PitchService();

  getPitches = asyncHandler(async (req: Request, res: Response) => {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(
      1,
      Math.min(100, parseInt(req.query.limit as string) || 10),
    );
    const name = (req.query.name as string) || undefined;
    const type = (req.query.type as string) || undefined;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder =
      (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

    const pitches = await this.pitchService.getAllPitches(
      page,
      limit,
      name,
      type,
      sortBy,
      sortOrder,
    );

    return res
      .status(200)
      .json(
        new ApiResponse(true, 200, "Pitches fetched successfully", pitches),
      );
  });

  getPitchById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const pitch = await this.pitchService.getPitchById(id);

    if (!pitch) {
      throw new AppError("Pitch not found", 404);
    }

    return res
      .status(200)
      .json(new ApiResponse(true, 200, "Pitch fetched successfully", pitch));
  });
}
