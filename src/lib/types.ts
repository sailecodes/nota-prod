import { z } from "zod";
import { signInSchema } from "./schemas";

export type signInType = z.infer<typeof signInSchema>;
