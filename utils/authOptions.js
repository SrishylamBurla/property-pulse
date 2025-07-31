import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/config/database"
import User from "@/models/User"

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                prompt: "select_account",
                access_type: "offline",
                response_type: "code",
                },
            }
        })
    ],
    callbacks:{
        // invoked on successful sign in
        async signIn({profile}){
            //1. connect to the database
            await connectDB()
            //2. check if user exist
            const userExists = await User.findOne({email: profile.email})
            //3. if not, create user
            if(!userExists){
            // truncate username if it is too long
                const username = profile.name.slice(0, 20)
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }
            //4. return true to allow sign in
            return true
        },
        //Session callback function that modifies the session object
        async session({session}){
            //1. get user from database
            const user = await User.findOne({email: session.user.email})
            //2. assign userId from the session
            session.user.id = user.id.toString()
            // return session
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET      
}

export default authOptions
