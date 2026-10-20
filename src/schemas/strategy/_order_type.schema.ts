import z from "zod";
import {
    OrderType,
    BestBidAskLimitAfterMaxAttemptsReached,
    ExitOrderType
} from "../../constants/strategy.constants";

const ExitBestBidAskLimitSettingsSchema = z.object({
    postOnly: z.boolean().optional()
});
const EntryBestBidAskLimitSettingsSchema = ExitBestBidAskLimitSettingsSchema.merge(
    z.object({
        maxAttempts: z.number().int().nullish(),
        afterMaxAttemptsReached: z.enum(BestBidAskLimitAfterMaxAttemptsReached).nullish(),
        maxChaseDistance: z.number().nullish()
    })
);

export const EntryOrderTypeSchema = z.discriminatedUnion('orderType', [
    z.object({
        orderType: z.literal(OrderType.BestBidAskLimit),
        orderTypeSettings: EntryBestBidAskLimitSettingsSchema.nullable(),
    }),

    z.object({
        orderType: z.enum([OrderType.Market, OrderType.Limit]),
        orderTypeSettings: z.null().optional(),
    }),
]).optional();

export const TakeProfitOrderTypeSchema = z.discriminatedUnion('takeProfitOrderType', [
    z.object({
        takeProfitOrderType: z.literal(ExitOrderType.BestBidAskLimit),
        takeProfitOrderTypeSettings: ExitBestBidAskLimitSettingsSchema.nullable(),
    }),

    z.object({
        takeProfitOrderType: z.literal(ExitOrderType.Market),
        takeProfitOrderTypeSettings: z.null().optional(),
    }),

    z.object({
        takeProfitOrderType: z.literal(undefined).optional(),
        takeProfitOrderTypeSettings: z.undefined().optional()
    }),
]).optional();

export const StopLossOrderTypeSchema = z.discriminatedUnion('stopLossOrderType', [
    z.object({
        stopLossOrderType: z.literal(ExitOrderType.BestBidAskLimit),
        stopLossOrderTypeSettings: ExitBestBidAskLimitSettingsSchema.nullable(),
    }),

    z.object({
        stopLossOrderType: z.literal(ExitOrderType.Market),
        stopLossOrderTypeSettings: z.null().optional(),
    }),

    z.object({
        stopLossOrderType: z.literal(undefined).optional(),
        stopLossOrderTypeSettings: z.undefined().optional()
    }),
]);

