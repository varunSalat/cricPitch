import { PitchRepository } from "../repositories";

export class PitchService {
  private pitchRepository = new PitchRepository();

  async getAllPitches(
    page: number = 1,
    limit: number = 10,
    name?: string,
    type?: string,
    sortBy: string = "createdAt",
    sortOrder: "asc" | "desc" = "desc",
  ) {
    return this.pitchRepository.findAll(page, limit, name, type, sortBy, sortOrder);
  }

  async getPitchById(id: string) {
    return this.pitchRepository.findById(id);
  }
}
