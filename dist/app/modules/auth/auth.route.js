"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
// login user
router.post('/login', (0, validationRequest_1.default)(auth_validation_1.authValidation.loginValidationZodSchema), auth_controller_1.authController.loginUser);
// // refresh token
router.post('/refresh-token', (0, validationRequest_1.default)(auth_validation_1.authValidation.refreshTokenValidationZodSchema), auth_controller_1.authController.refreshToken);
exports.authRoute = router;
