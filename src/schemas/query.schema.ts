import z from "zod";
import {EnumLike} from "zod/v4/core/util";
import {Status as StrategyStatus} from "../constants/strategy.constants";
import {Status as ApiProfileStatus} from "../constants/apiProfile.constants";

// https://zod.dev/?id=table-of-contents

// reused fields
const apiProfilesSchemaField = {
    apiProfiles: z.string().array().min(1).optional(),
};

const getStatusesSchemaField = (enums: EnumLike) => {
    return {
        statuses: z.enum(enums).array().optional()
    };
};

// schemas
export const PaginationQuerySchema = z.object({
    page: z.number().positive().optional(),
    limit: z.number().positive().optional(),
});

export const ExchangesQuerySchema = z.object({
    exchanges: z.string().array().min(1).optional(),
});

export const ProfileFindManyQuerySchema = z.object({
    ...PaginationQuerySchema.shape,
    ...ExchangesQuerySchema.shape,
    ...apiProfilesSchemaField,
    ...getStatusesSchemaField(ApiProfileStatus),
});

export const StrategyFindManyQuerySchema = z.object({
    ...PaginationQuerySchema.shape,
    ...ExchangesQuerySchema.shape,
    ...apiProfilesSchemaField,
    ...getStatusesSchemaField(StrategyStatus),
});