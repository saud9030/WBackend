import passportJWT from "passport-jwt";
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};
// to extract token from the header as BearerToken;()
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// this is secret key, in production it should be on an env **LOOK THAT UP**
jwtOptions.secretOrKey = "SECRET_KEY";

export default jwtOptions;
