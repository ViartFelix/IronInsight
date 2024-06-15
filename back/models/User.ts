export default interface User {
    id_user: number;
    email: string;
    password: string | undefined;
    username: string;
    weight: number;
    height: number;

    created_at: Date;
    updated_at: Date;
}