import {prisma} from "../generated/prisma-client";
import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

// a callback function that a JwtStrategy provides the decoded information to 
// done: a function that is executed when the user is found
// payload: gets an interpreted ID from the token and returns a user
const verifyUser = async(payload, done) => {
    try {
        const user = await prisma({id: payload.id })
        if (user!==null){
            return done(null, user)
        } else {
            return done(null, false); 
        }
    } catch (error) {
        return done(error, false);
    }
};
 
// all streamlined from verify User
export const authenticateJwt = (req, res, next) => 
    passport.authenticate("jwt", {sessions: false},  (error, user) => {
        // append user on req
        if (user){
            console.log("In authenticateJwt: ", user)
            req.user = user;
        }
        next();
    })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser)); //extract token and execute verifyUser
passport.initialize();