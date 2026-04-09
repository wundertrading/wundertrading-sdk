import z from "zod";

// https://zod.dev/?id=table-of-contents
// validate only mandatory fields

export const StrategySwingSchema = z.object({
    clientId: z.union([
        z.null(),
        z.undefined(),
        z.string().regex(/^[~=\-a-zA-Z0-9]+$/).min(32).max(64)
    ])
});