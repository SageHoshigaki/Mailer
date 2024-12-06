import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export async function requireAuthentication(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "http://localhost:3000/signup",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
