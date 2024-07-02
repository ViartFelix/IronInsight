import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

//take env values
dotenv.config();

//auth middleware
const auth = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

export default auth;
