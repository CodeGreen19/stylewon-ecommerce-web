import z from "zod";

export const bdPhoneRegex = /^01[0-9]{9}$/;
// Schema
// export const personalInfoSchema = z.object({
//   fullName: z.string().trim().min(3, "Full name is required"),
//   email: z.email("Enter a valid email"),
//   phoneNo: z
//     .string()
//     .trim()
//     .refine(
//       (v) => {
//         const bdPhoneRegex = /^01[0-9]{9}$/;
//         const isPhoneNo = bdPhoneRegex.test(v);
//         return isPhoneNo;
//       },
//       {
//         message: "Please enter a valid phone no",
//       },
//     ),
//   gender: z.enum(["Male", "Female", "Other"]),
// });

// export type PersonalInfoSchemaType = z.infer<typeof personalInfoSchema>;
