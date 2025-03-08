import { z } from "zod";
import { extendZod, zodSchema } from "@zodyac/zod-mongoose";
import { db } from "../driver/db";
extendZod(z);

const zUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    address: z.string(),
});

export type User = z.infer<typeof zUser>;

const schema = zodSchema(zUser,{
    validateBeforeSave: true
});
schema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});
schema.index({ email: 1 }, { unique: true });

export const UserModel = db.model<User>("User", schema);