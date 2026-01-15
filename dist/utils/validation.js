"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = exports.ContactSchema = exports.DonationSchema = void 0;
const zod_1 = require("zod");
/* Donation validation schema */
exports.DonationSchema = zod_1.z.object({
    amount: zod_1.z.number().positive('Amount must be a positive number'),
    donorName: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    donorEmail: zod_1.z.string().email('Invalid email address'),
    message: zod_1.z.string().optional(),
});
/* Contact form validation schema */
exports.ContactSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    message: zod_1.z.string().min(10, 'Message must be at least 10 characters'),
});
/* Helper function to validate data */
const validateData = (schema, data) => {
    try {
        const validatedData = schema.parse(data);
        return { valid: true, data: validatedData };
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const message = error.issues
                .map((e) => `${e.path.join('.')}: ${e.message}`)
                .join(', ');
            return { valid: false, error: message };
        }
        return { valid: false, error: 'Validation failed' };
    }
};
exports.validateData = validateData;
//# sourceMappingURL=validation.js.map