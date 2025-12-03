import { account } from "@/auth-schema";
import { db } from "@/drizzle/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { hashPassword } from "better-auth/crypto";
import { phoneNumber } from "better-auth/plugins";
import { and, eq } from "drizzle-orm";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  emailVerification: {
    async sendVerificationEmail(data, request) {
      console.log("email var=>", data);
    },
    async onEmailVerification(user, request) {
      console.log("onemail-var", user);
    },

    async afterEmailVerification(user, request) {
      console.log("after-email-var", user);
    },
  },

  user: {
    changeEmail: {
      enabled: true,
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      update: {
        after: async (user, ctx) => {
          if (ctx?.path === "/verify-email") {
            await db.delete(account).where(eq(account.userId, user.id));
            console.log("prev account deleted");
          }
        },
      },
    },
  },

  plugins: [
    phoneNumber({
      expiresIn: 30,
      async sendPasswordResetOTP({ code, phoneNumber }, ctx) {
        console.log(code, phoneNumber);
      },
      async callbackOnVerification(data, ctx) {
        const userId = data.user.id;
        const [isAccountExist] = await db
          .select()
          .from(account)
          .where(
            and(
              eq(account.userId, userId),
              eq(account.providerId, "credential"),
            ),
          );
        if (!isAccountExist) {
          const password = await hashPassword("passcode");
          await db.insert(account).values({
            accountId: crypto.randomUUID().toString(),
            id: crypto.randomUUID().toString(),
            providerId: "credential",
            userId: data.user.id,
            password,
          });
        }
      },

      sendOTP: ({ phoneNumber, code }, ctx) => {
        console.log(phoneNumber, code);
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@my-site.com`;
        },
        getTempName: (phoneNumber) => {
          return phoneNumber;
        },
      },
    }),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP(data, ctx) {
        console.log(data);
      },
    }),
  ],
});
