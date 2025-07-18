import { createTRPCRouter } from "../init";
import { authRouter } from "@/modules/auth/server/procedures";
import { CategoriesRouter } from "@/modules/categories/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { tagsRouter } from "@/modules/tags/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  products: productsRouter,
  tags: tagsRouter,
  categories: CategoriesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
