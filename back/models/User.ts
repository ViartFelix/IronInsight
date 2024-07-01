export default class User {
    id_user: number;
    email: string;
    password: string | undefined;
    username: string;
    weight: number;
    height: number;

    created_at: Date;
    updated_at: Date;

    /**
     * Converts the model as a string.
     * @param flashPwd If the password should be shown or not
     */
    public toString(flashPwd: boolean = false): string
    {
        return {
            id_user: this.id_user,
            email: this.email,
            username: this.username,
            weight: this.weight,
            height: this.height,
            created_at: this.created_at,
            updated_at: this.updated_at,
            password: (flashPwd ? this.password : undefined)
        } as unknown as string;
    }
}