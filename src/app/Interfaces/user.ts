export interface User {
    uid: string;
    email: string;
    senha: string;
    displayName: string | null;
    photoURL?: string;
}
