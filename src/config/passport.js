import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import User from "../models/users.js";
import passport from "passport";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new Strategy(options, async (payload, cb) => {
    try {
        const user = await User.findById(payload.userId);
        if (!user) {
            return cb(null, false);
        }
        return cb(null, user);
    } catch (error) {
        return cb(error, false);
    }
}));

export default passport;