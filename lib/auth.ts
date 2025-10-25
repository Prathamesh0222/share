import { PrismaClient } from "./generated/prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        if (process.env.NODE_ENV === "development") {
          console.log("Magic Link for:", email);
          console.log("URL: ", url);
          return;
        }
        const firstName = email.split("@")[0];
        await resend.emails.send({
          from: "typen@gmail.com",
          to: email,
          subject: "Verify your email",
          react: EmailTemplate({
            firstName,
            magicLink: url,
          }),
        });
      },
    }),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
