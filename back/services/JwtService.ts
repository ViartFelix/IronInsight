import * as jwt from 'jsonwebtoken';

class JwtService
{
    constructor() {
    }

    /**
     * Generates a JT token for the data provided.
     * @param data
     */
    public generateToken(data: string|object|Buffer)
    {
        return jwt.sign(data, process.env.JWT_SECRET);
    }
}

export const jwtService = new JwtService();