import { z } from "zod";

export const bookingSchema = z.object({
  body: z.object({
    slotId: z.string("Slot Id is required"),
  }),
});
