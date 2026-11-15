import z from "zod";




export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").pipe(z.email("Invalid email address")),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})



export type loginFormType = z.infer<typeof loginSchema>