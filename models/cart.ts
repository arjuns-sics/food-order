import { z } from "zod";
import { extendZod, zodSchema } from "@zodyac/zod-mongoose";
import { db } from "../driver/db";
extendZod(z);

const zCart = z.object({
    userId: z.string(),
    menuId: z.string(),
    quantity: z.number(),
    total: z.number(),
});

export type Cart = z.infer<typeof zCart>;

const schema = zodSchema(zCart, {
    validateBeforeSave: true
});

export const CartModel = db.model<Cart>("Cart", schema);