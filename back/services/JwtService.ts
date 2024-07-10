import * as jwt from 'jsonwebtoken';
import User from "../models/User";

class JwtService {
  constructor() {
  }

  /**
   * Generates a JT token for the data provided.
   * @param user
   */
  public generateToken(user: User) {
    const cleanData = Object.assign({}, user)

    return jwt.sign(cleanData, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });
  }
}

export const jwtService = new JwtService();
