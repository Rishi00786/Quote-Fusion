import { redirect } from 'next/navigation';
import { db } from './db';
import { currentUser, redirectToSignIn } from '@clerk/nextjs/server'

const initialProfile = async () => {
    const user = await currentUser()

    if (!user) {
        return redirect('/')
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if (profile) {
        return profile
    }

    const name = user.firstName
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : user.id;

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: name,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })
    return newProfile;
}

export default initialProfile
