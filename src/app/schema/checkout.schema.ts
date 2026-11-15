import z from "zod";




export const checkoutSchema = z.object({
    details: z.string().min(1, "Address details are required"),
    phone: z.string().min(1, "Phone number is required").regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    city: z.string().min(1, "City is required")
})



export type checkoutFormType = z.infer<typeof checkoutSchema>