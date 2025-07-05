import Joi from "joi";
import { employmentTypes, genderOptions } from "../config/constants.js";
import { validate } from "./request.js";

const registerRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_no: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).required().alphanum(),
    date_of_birth: Joi.date().optional(),
    profile_image: Joi.string().optional(),
    gender: Joi.string().valid(...genderOptions).optional(),
    address: Joi.string().optional(),
    current_designation: Joi.string().optional(),
    total_experience: Joi.string().optional(),
    current_company: Joi.string().optional(),
    notice_period: Joi.string().optional(),
    expected_salary: Joi.string().optional(),
    current_salary: Joi.string().optional(),
    employment_type: Joi.string().valid(...employmentTypes).optional(),
    preferred_location: Joi.string().optional(),
    open_to_remote: Joi.boolean().optional(),
    willing_to_relocate: Joi.boolean().optional(),
    job_roles_interested_in: Joi.array().items(Joi.string()).optional(),
    industries: Joi.array().items(Joi.string()).optional(),
    available_from: Joi.date().optional(),
    linkedin_profile: Joi.string().uri().optional(),
    personal_website: Joi.string().uri().optional(),
    about_me: Joi.string().optional(),
    skills: Joi.array().items(Joi.string()).optional(),
    hobbies: Joi.array().items(Joi.string()).optional(),
    languages: Joi.array().items(Joi.string()).optional(),
    education: Joi.array().items(
        Joi.object({
            degree: Joi.string().required(),
            institution: Joi.string().required(),
            start_date: Joi.date().optional(),
            end_date: Joi.date().optional(),
            grade: Joi.string().optional()
        })
    ).optional(),
    work_experience: Joi.array().items(
        Joi.object({
            job_title: Joi.string().required(),
            company: Joi.string().required(),
            start_date: Joi.date().optional(),
            end_date: Joi.date().optional(),
            responsibilities: Joi.string().optional()
        })
    ).optional(),
    references: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            relationship: Joi.string().required(),
            email: Joi.string().email().optional(),
            phone: Joi.string().optional()
        })
    ).optional(),
    cover_letter: Joi.string().optional(),
    resume: Joi.string().optional(),
    certificates: Joi.array().items(Joi.string()).optional(),
})

export const registerValidation = validate(registerRequest);