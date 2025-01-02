import { databases } from "../utils/appwrites"
import { ID } from 'appwrite'


export async function singupuser(email: string, fullname: string, phone: string): Promise<User> {
    const newuser = { email: email, fullname: fullname, phone: phone }


    const response = await databases.createDocument(
        'DBLD',
        '67751f2a00039872c0e0',
        ID.unique(),
        newuser
    )

    const user = {
        $id: response.$id,
        $createdAt: response.$createdAt,
        email: response.email,
        fullname: response.fullname,
        phone: response.phone
    }

    return user
}