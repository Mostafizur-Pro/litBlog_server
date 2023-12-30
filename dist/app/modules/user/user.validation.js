"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidation = void 0;
const zod_1 = require("zod");
const userZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        role: zod_1.z.enum(['admin', 'super admin', 'user']).optional(),
        phone: zod_1.z.string({
            required_error: 'Number is required',
        }),
    }),
});
exports.userZodValidation = {
    userZodSchema,
};
