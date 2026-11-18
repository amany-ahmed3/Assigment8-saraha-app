export class AppError extends Error {
    constructor(message,statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}


export const UserNotFound = new AppError('User not found',404);
export const UserAlreadyExists = new AppError('User already exists ',409);
export const InvalidCredentials = new AppError('Invalid Credentials',403);
export const UserNotVerified = new AppError('User not verified',403);
export const InvalidOtp = new AppError('Invalid OTP',400);
export const OTPExpired = new AppError('OTP expired',400);