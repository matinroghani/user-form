import type { Dayjs } from "dayjs";

export type FormData = {
  name: string;
  country: string;
  gender: string;
  isAgree: boolean;
  dob: Dayjs | null;
};
