import z from "zod";




export const registerSchema = z.object({
    name: z.string().min(1, "Name is required").min(3,  "Name must be at least 3 characters long" ).max(10, "Name must be at most 10 characters long"),
    email: z.string().min(1, "Email is required").pipe(z.email("Invalid email address")),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
    rePassword: z.string().min(1, "Confirm Password is required").min(6, "Confirm Password must be at least 6 characters long").max(20, "Confirm Password must be at most 20 characters long"),
    phone: z.string().min(1, "Phone is required").regex(/^01[0125][0-9]{8}$/,'phone must be valid Egyptian phone number')
}).refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords do not match",
})



export type RegisterFormType = z.infer<typeof registerSchema>