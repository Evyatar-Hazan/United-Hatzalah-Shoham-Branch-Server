import { z } from 'zod';
export declare const DonationSchema: z.ZodObject<{
    amount: z.ZodNumber;
    donorName: z.ZodString;
    donorEmail: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type DonationInput = z.infer<typeof DonationSchema>;
export declare const ContactSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
export type ContactInput = z.infer<typeof ContactSchema>;
export declare const validateData: <T>(schema: z.ZodSchema, data: unknown) => {
    valid: boolean;
    data?: T;
    error?: string;
};
//# sourceMappingURL=validation.d.ts.map