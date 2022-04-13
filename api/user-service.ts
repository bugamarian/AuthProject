import {v4 as uuidv4} from 'uuid'

import {UserDocument} from '@shared'

import { databaseClient } from './database'

function collection() {
    return databaseClient.db(process.env.MONGODB_DATABASE).collection<UserDocument>('users')
}

export async function createUser(name:string, githubUserId:number) {
    const user: UserDocument = {
        _id : uuidv4(),
        name,
        tokenVersion : 0,
        githubUserId : githubUserId.toString(),
    }
    const coll = await collection()
    const result = await coll.insertOne(user)
    if (result.acknowledged) return user

    throw new Error('Failed to create user')

}

export async function getUserbyGitHubId(githubUserId:number) {
    const coll = await collection()
    const result = await coll.findOne({githubUserId : githubUserId.toString()})
    if (result) return result

    throw new Error('Failed to get user')
}

