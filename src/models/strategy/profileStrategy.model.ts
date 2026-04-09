import {Order} from './order.model';
import {Status} from "../../constants/profileStrategy.constants";

export interface ProfileStrategy {

    profileStrategyId: string;

    status?: Status;

    entryPrice?: number;

    exitPrice?: number | null;

    profile?: {
        name?: string;
        code: string;
    };

    amount?: number;

    exitAmount?: number;

    cost?: number;

    totalExitCost?: number;

    entryVolume?: number;

    exitVolume?: number;

    entryCommission?: number;

    exitCommission?: number;

    entryCommissionCost?: number;

    exitCommissionCost?: number;

    entryCommissionUSD?: number;

    exitCommissionUSD?: number;

    profitLoss?: number;

    exitPnl?: number;

    info?: string | null;

    errorTransKey?: string | null;

    partialFill?: number | null;

    trailingStopActivationPrice?: number | null;

    trailingStopExecutePrice?: number | null;

    buyOrders?: Order[] | null;

    sellOrders?: Order[] | null;

    issues?: Record<string, {
        code?: string;
        extra?: any;
        sent?: boolean;
        date?: string;
    }> | null;
}