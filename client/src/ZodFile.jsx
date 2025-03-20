import { z } from "zod";

export const genderOptions = ["male", "female", "other"];

const today = new Date();
const minAge = 14;
const maxAge = 99;

export const calculateAge = (dateOfBirthString) => {
  if (!dateOfBirthString) return "0";
  // console.log(today.getFullYear());

  const dateOfBirth = new Date(dateOfBirthString);
  if (isNaN(dateOfBirth.getTime())) {
    return "Invalid date";
  }

  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDifference = today.getMonth() - dateOfBirth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
    return age - 1;
  }
  return age;
};

export const allSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "Field is required" })
    .regex(/^[a-zA-Z]+$/, "Please enter only alphabets"),
  lastname: z
    .string()
    .min(1, { message: "Field is required" })
    .regex(/^[a-zA-Z]+$/, "Please enter only alphabets"),
  email: z.string().email("Invalid email format"),
  gender: z.enum(genderOptions, {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  dateOfBirth: z.coerce.date().refine(
    (date) => {
      const age = calculateAge(date);
      return age >= minAge && age < maxAge;
    },
    {
      message: `Age must be between ${minAge} and ${maxAge} years old`,
    }
  ),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
});
