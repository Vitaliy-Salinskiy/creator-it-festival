import z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Ім'я повинно містити принаймні 2 символи")
    .max(40, "Ім'я не повинно перевищувати 40 символів"),
  email: z.string().email("Недійсна електронна адреса"),
  phoneNumber: z
    .string()
    .regex(
      /^\+380\d{9}$/,
      "Недійсний номер телефону, введіть у форматі +380XXXXXXXXX"
    ),
  fingerprintId: z.string().min(1),
});
