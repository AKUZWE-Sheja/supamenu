import { z } from 'zod'

export const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().min(10, 'Phone must be at least 10 characters').max(15, 'Phone must be at most 15 characters'),
});

export const validateNewUser = (data: any) => {
    console.log("Validating user data:", data); 
    const NewUser = signupSchema.safeParse(data);
    if (!NewUser.success) {
        console.error("Validation errors:", NewUser.error.errors);
        throw new Error(NewUser.error.errors[0].message);
    }
    return NewUser.data;
};

export const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
});

export const validateOldUser = (data: any) => {
    const OldUser = loginSchema.safeParse(data);
    if (!OldUser.success) {
        throw new Error(OldUser.error.errors[0].message);
    }
    return OldUser.data;
};
