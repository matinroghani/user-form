import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").min(3),

  country: z.string().min(1, "Country is required"),

  gender: z.string().min(1, "Gender is required"),

  dob: z
    .custom<Dayjs>((v) => dayjs.isDayjs(v), {
      message: "Invalid date",
    })
    .refine((v) => dayjs().diff(v, "year") >= 18, {
      message: "You must be at least 18 years old",
    }),

  isAgree: z.boolean().refine((v) => v === true, {
    message: "You must accept terms",
  }),
});

export type UserFormDate = z.infer<typeof userFormSchema>;