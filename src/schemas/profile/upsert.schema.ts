import {MarginMode, TradeMode} from "../../constants/apiProfile.constants";
import z from "zod";

export const ApiProfileBaseSchema = z.object({
    api: z.string().min(2).max(896),
    secret: z.string().min(2).max(2048).nullable(),
    name: z
        .string()
        .min(2)
        .max(255)
        .regex(/^[a-zA-Z0-9_.-]+$/),
    exchangeFamily: z.string().min(1).max(255),
    marginMode: z.enum(MarginMode),
    tradeMode: z.enum(TradeMode),
    password: z.string().min(2).max(2048).nullable(),
    applicationId: z.string().min(1).max(2048).nullable()
});

export const ApiProfileCreateSchema = ApiProfileBaseSchema.extend({
    secret: ApiProfileBaseSchema.shape.secret.optional(),
    marginMode: ApiProfileBaseSchema.shape.marginMode.optional(),
    tradeMode: ApiProfileBaseSchema.shape.tradeMode.optional(),
    password: ApiProfileBaseSchema.shape.password.optional(),
    applicationId: ApiProfileBaseSchema.shape.applicationId.optional()
});

export const ApiProfileEditSchema = ApiProfileBaseSchema
    .extend({
        api: ApiProfileBaseSchema.shape.api.nullable(),
        name: ApiProfileBaseSchema.shape.name.nullable(),
        exchangeFamily: ApiProfileBaseSchema.shape.exchangeFamily.nullable(),
    })
    .partial(); // make all fields optional