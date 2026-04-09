import z from "zod";
import {BaseOn} from "../../constants/strategy.constants";

// https://zod.dev/?id=table-of-contents
// validate only mandatory fields

const baseShape = {
    reduceOnly: z.boolean().optional(),
    takeProfitBaseOn: z.enum(BaseOn).optional(),
    takeProfits: z
        .object({
            price: z.number().finite().positive(), // strict price
            portfolio: z.number().finite().gt(0).lte(1) // portfolio value must be in (0;1]
        })
        .array()
        .optional(),
    stopLossBaseOn: z.enum(BaseOn).optional(),
    stopLossPrice: z.union([z.null(), z.number().finite().gte(0)]).optional(),
    stopLossMovePrice: z.union([z.null(), z.number().finite().positive()]).optional(),
    stopLossMoveExecutePrice: z.union([z.null(), z.number().finite().gte(0)]).optional(),
    trailingStopActivation: z.union([z.null(), z.number().finite().positive()]).optional(),
    trailingStopExecute: z.union([z.null(), z.number().finite().positive()]).optional(),
};

export const StrategyEditClassicSchema = z.object({
    ...baseShape,
    placeConditionalOrdersOnExchange: z.boolean().optional(),
});

export const StrategyEditDcaSchema = z.object({
    ...baseShape,
    extraOrderCount: z.number().finite().gt(0).optional(),
    extraOrderDeviation: z.number().finite().gt(0).optional(),
    extraOrderVolumeMultiplier: z.number().finite().gt(0).optional(),
    extraOrderDeviationMultiplier: z.union([
        z.null(),
        z.number().finite().gt(0)
    ]).optional(),
});