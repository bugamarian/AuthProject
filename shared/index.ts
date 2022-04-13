export interface UserDocument{
    _id : string
    name : string
    tokenVersion : number
    githubUserId : string
}

export interface AccessTokenPayload {
    userId : string
}

export interface RefreshTokenPayload {
    userID : string
    version : number
}

export enum Cookies {
    AccessToken = 'access',
    RefreshToken = 'refresh',
}