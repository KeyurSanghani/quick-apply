import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { employmentTypes, genderOptions } from "../config/constants.js";
const salt = bcrypt.genSaltSync(10);

const EducationSchema = new mongoose.Schema({
    degree: String,
    field_of_study: String,
    institute_name: String,
    start_year: Number,
    end_year: Number,
    grade_or_score: String
});

const WorkExperienceSchema = new mongoose.Schema({
    company_name: String,
    job_title: String,
    job_description: String,
    start_date: Date,
    end_date: Date,
    currently_working_here: {
        type: Boolean,
        default: false
    }
});

const ReferenceSchema = new mongoose.Schema({
    name: String,
    relationship: String,
    contact_email: String,
    phone: String
});

const UserSchema = mongoose.Schema({
    // Basic Info
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_no: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_image: {
        type: String,
        default: "default.png"
    },
    date_of_birth: Date,
    gender: {
        type: String,
        enum: genderOptions
    },
    address: String,

    // Professional
    current_designation: String,
    total_experience: String,
    current_company: String,
    notice_period: String,
    expected_salary: String,
    current_salary: String,
    employment_type: {
        type: String,
        enum: employmentTypes
    },
    preferred_location: String,
    open_to_remote: Boolean,
    willing_to_relocate: Boolean,
    job_roles_interested_in: [String],
    industries: [String],
    available_from: Date,

    // Online Profiles
    linkedin_profile: String,
    personal_website: String,

    // Description & Skills
    about_me: String,
    skills: [String],
    hobbies: [String],
    languages: [String],

    // Education & Work History
    education: [EducationSchema],
    work_experience: [WorkExperienceSchema],
    references: [ReferenceSchema],

    // Documents
    resume: String, // File path or URL
    certificates: [String], // Array of file paths or URLs
    cover_letter: String // Optional file or text content

}, {
    timestamps: true
});

// Password hashing middleware
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", UserSchema);
export default User;
