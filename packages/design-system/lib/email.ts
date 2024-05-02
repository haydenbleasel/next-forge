export const emailRegex = /.+@.+/u;

export const isValidEmail = (email: string): boolean => emailRegex.test(email);
