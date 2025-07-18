import { headers as getHeaders } from "next/headers";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { TRPCError } from "@trpc/server";

import { loginSchemas, registerSchemas } from "../schemas";

import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.payload.auth({ headers });

    return session;
  }),

  register: baseProcedure
    .input(registerSchemas)
    .mutation(async ({ input, ctx }) => {
      const existData = await ctx.payload.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existUser = existData.docs[0];
      if (existUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }

      const tenant = await ctx.payload.create({
        collection: "tenants",
        data: {
          name: input.username,
          slug: input.username,
          stripeAccountId: "test",
        },
      });

      await ctx.payload.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, // will be hashed
          tenants: [
            {
              tenants: tenant.id,
            },
          ],
        },
      });

      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      await generateAuthCookie({
        prefix: ctx.payload.config.cookiePrefix,
        value: data.token,
      });
    }),

  login: baseProcedure.input(loginSchemas).mutation(async ({ input, ctx }) => {
    const data = await ctx.payload.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }
    await generateAuthCookie({
      prefix: ctx.payload.config.cookiePrefix,
      value: data.token,
    });

    return data;
  }),
});
