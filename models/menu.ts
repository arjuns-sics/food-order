import { z } from "zod";
import { extendZod, zodSchema } from "@zodyac/zod-mongoose";
import { db } from "../driver/db";
extendZod(z);

const zMenu = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    image: z.string()
});

export type Menu = z.infer<typeof zMenu>;

const schema = zodSchema(zMenu, {
    validateBeforeSave: true
});

export const MenuModel = db.model<Menu>("Menu", schema);