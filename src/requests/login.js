import Joi from "joi";
import { validate } from "./request.js";

const loginRequest = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const loginValidation = validate(loginRequest);