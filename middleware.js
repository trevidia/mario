import {withAuth} from "next-auth/middleware";

export default withAuth(
    function middleware(req){
        console.log(req.nextauth.token)
    },
    {
        callbacks: {
            authorized: ({token})=> token?.role === "admin"
        },
        pages: {
            signIn: "/auth/login"
        }
    }
)

export const config = {matcher: ["/admin"]}