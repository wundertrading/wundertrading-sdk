import z from "zod";
import {AmountPerTradeType, OrderType, TradeSide} from "../../constants/strategy.constants";

// https://zod.dev/?id=table-of-contents
// validate only mandatory fields
const refine = (data: any, ctx: any) => {
    const issuesArgs = [];

    if (data.orderType === OrderType.Limit) {
        if (!data.price) {
            issuesArgs.push({ code: "invalid_type", path: ['price'], expected: "number" });
        }

        if (!data.timeToLive) {
            issuesArgs.push({ code: "invalid_type", path: ['timeToLive'], expected: "number" });
        }
    }

    for (const issueArgs of issuesArgs) {
        ctx.addIssue(issueArgs);
    }
};

export const StrategyTradeSchema = z.object({
    clientId: z.union([
        z.null(),
        z.undefined(),
        z.string().regex(/^[~=\-a-zA-Z0-9]+$/).min(32).max(64)
    ]),
    exchangeCode: z.string(),
    pairCode: z.string(),
    profilesCodes: z.string().array().min(1),
    side: z.enum(TradeSide),
    orderType: z.enum(OrderType),
    price: z.number().positive().optional(),
    timeToLive: z.number().min(5).max(20160).optional(),
    amountPerTrade: z.number().positive(),
    amountPerTradeType: z.enum(AmountPerTradeType),
}).superRefine(refine);