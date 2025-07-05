import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { sendResponse, internalServerError } from '../services/jsonResponceService.js';
import { certificatesUploadPath, profileUploadPath, resumeUploadPath } from '../config/constants.js';

// Register function - updated to match new schema
export const register = async (req, res) => {
    const {
        name,
        email,
        phone_no,
        password,
        date_of_birth,
        gender,
        address,
        current_designation,
        total_experience,
        current_company,
        notice_period,
        expected_salary,
        current_salary,
        employment_type,
        preferred_location,
        open_to_remote,
        willing_to_relocate,
        job_roles_interested_in,
        industries,
        available_from,
        linkedin_profile,
        personal_website,
        about_me,
        skills,
        hobbies,
        languages,
        education,
        work_experience,
        references,
    } = req.body;

    const profile_image = req.files && req.files.profile_image ? req.files.profile_image[0].path : 'default.png';
    const resume = req.files && req.files.resume ? req.files.resume[0].path : null;
    const certificates = req.files && req.files.certificates ? req.files.certificates.map(file => file.path) : [];

    try {

        const userData = {
            name,
            email,
            phone_no,
            password
        };

        if (date_of_birth) userData.date_of_birth = new Date(date_of_birth);
        if (gender) userData.gender = gender;
        if (address) userData.address = address;
        if (current_designation) userData.current_designation = current_designation;
        if (total_experience) userData.total_experience = total_experience;
        if (current_company) userData.current_company = current_company;
        if (notice_period) userData.notice_period = notice_period;
        if (expected_salary) userData.expected_salary = expected_salary;
        if (current_salary) userData.current_salary = current_salary;
        if (employment_type) userData.employment_type = employment_type;
        if (preferred_location) userData.preferred_location = preferred_location;
        if (open_to_remote !== undefined) userData.open_to_remote = open_to_remote;
        if (willing_to_relocate !== undefined) userData.willing_to_relocate = willing_to_relocate;
        if (job_roles_interested_in) userData.job_roles_interested_in = job_roles_interested_in;
        if (industries) userData.industries = industries;
        if (available_from) userData.available_from = new Date(available_from);
        if (linkedin_profile) userData.linkedin_profile = linkedin_profile;
        if (personal_website) userData.personal_website = personal_website;
        if (about_me) userData.about_me = about_me;
        if (skills) userData.skills = skills;
        if (hobbies) userData.hobbies = hobbies;
        if (languages) userData.languages = languages;
        if (education) userData.education = education;
        if (work_experience) userData.work_experience = work_experience;
        if (references) userData.references = references;
        if (profile_image) userData.profile_image = profile_image;
        if (resume) userData.resume = resume;
        if (certificates) userData.certificates = certificates;

        const user = new User(userData);
        await user.save();
        return sendResponse(res, true, null, 'User registered successfully', 201);
    } catch (error) {
        return internalServerError(res, error.message);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(res, false, null, 'Invalid email or password', 401);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendResponse(res, false, null, 'Invalid email or password', 401);
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return sendResponse(res, true, { token }, 'Login successful', 200);
    } catch (error) {
        console.error('Error logging in user:', error);
        return internalServerError(res, 'Error logging in user');
    }
}
