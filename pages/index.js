import {getSession, useSession} from "next-auth/react";

const Index = ({session}) => {

  if (session && session.user?.role === "admin"){
    return "admin"
  } else {
    return ("hey fresh")
  }
}

export default Index

export async function getServerSideProps(context){
  const session = await getSession(context)
  console.log(session)
  return {
    props: {session}
  }
}