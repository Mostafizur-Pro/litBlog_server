"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
// import { errorLogger } from '../../shared/logger';
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.env === 'development'
        ? console.log('global error handler', error)
        : console.log('global error handler', error);
    let statusCode = 500;
    let message = 'Something went Wrong';
    let errorMessage = [];
    // checking validtion error
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        (statusCode = simplifiedError.statusCode),
            (message = simplifiedError.message),
            (errorMessage = simplifiedError.errorMessage);
    }
    //checking mongoose cast error
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        (statusCode = simplifiedError.statusCode),
            (message = simplifiedError.message),
            (errorMessage = simplifiedError.errorMessage);
    }
    // checking zod error
    else if (error instanceof zod_1.ZodError) {
        console.log('ZodError', error);
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    // checking custom error
    else if (error instanceof ApiError_1.default) {
        (statusCode = error === null || error === void 0 ? void 0 : error.statusCode),
            (message = error.message),
            (errorMessage = (error === null || error === void 0 ? void 0 : error.message)
                ? [
                    {
                        path: '',
                        message: error === null || error === void 0 ? void 0 : error.message,
                    },
                ]
                : []);
    }
    else if (error instanceof Error) {
        (message = error.message),
            (errorMessage = (error === null || error === void 0 ? void 0 : error.message)
                ? [
                    {
                        path: '',
                        message: error === null || error === void 0 ? void 0 : error.message,
                    },
                ]
                : []);
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config_1.default.env != 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    // next();
};
exports.default = globalErrorHandler;
