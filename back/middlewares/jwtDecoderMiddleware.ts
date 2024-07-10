import jwt  from "jsonwebtoken";
import {userService} from "../services/UserService";

function jwtDecoderMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  //if we have a token inside the request
  if(typeof authHeader !== "undefined") {
    const token = authHeader && authHeader.split(' ')[1].trim();

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(403)
      }
      //and we assign the decoded userData inside the request as the user
      req.user = userService.toUser(decoded)
      next();
    });
  } else {
    return res.sendStatus(401)
  }
}

export { jwtDecoderMiddleware }
