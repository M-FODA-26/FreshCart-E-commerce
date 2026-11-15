import z from "zod";




export const LoggedUserDataSchema = z.object({
    name: z.string().min(1, "Name is required").min(3,  "Name must be at least 3 characters long" ).max(10, "Name must be at most 10 characters long"),
    email: z.string().min(1, "Email is required").pipe(z.email("Invalid email address")),
    phone: z.string().min(1, "Phone is required").regex(/^01[0125][0-9]{8}$/,'phone must be valid Egyptian phone number')
    
})



export type LoggedUserDataFormType = z.infer<typeof LoggedUserDataSchema>