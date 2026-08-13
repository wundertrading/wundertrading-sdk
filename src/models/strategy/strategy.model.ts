import { Exchange } from '../market/exchange.model';
import { ProfileStrategy } from './profileStrategy.model';
import {OrderType, PairType, PortfolioType, Status, StrategyGroupType} from "../../constants/strategy.constants";

export interface NewStrategy {

    strategyId: string;

    clientId?: string | null;

    status?: Status;

}

export interface Strategy extends NewStrategy {

    type?: boolean;

    orderType?: OrderType;

    strategyGroupType?: StrategyGroupType;

    price?: number;

    lastPrice?: number | null;

    exchange?: Exchange;

    pair?: string;

    pairType?: PairType;

    pairSymbols?: {
        ref: string;
        base: string;
    };

    portfolioType?: PortfolioType;

    portfolio?: number;

    fixedAmount?: number;

    initFixedAmount?: number;

    initFixedAmountSymbol?: string;

    amountMultiplier?: number;

    leverage?: number;

    initialLeverage?: number;

    totalEntryAmount?: number;

    totalExitAmount?: number;

    totalEntryCost?: number | null;

    totalExitCost?: number | null;

    totalEntryVolume?: number;

    totalExitVolume?: number;

    totalEntryCommission?: number;

    totalExitCommission?: number;

    totalEntryCommissionCost?: number;

    totalExitCommissionCost?: number;

    weightedProfitLoss?: number;

    totalProfitLoss?: number;

    currentPosition?: number;

    createdAt?: string;

    updatedAt?: string;

    enteredAt?: string | null;

    takeProfits?: any[];

    stopLoss?: number | null;

    stopLossMove?: number | null;

    stopLossMoveExecute?: number | null;

    trailingStopActivation?: number | null;

    trailingStopExecute?: number | null;

    reduceOnly?: boolean;

    keepPositionOpen?: boolean;

    placeConditionalOrdersOnExchange?: boolean;

    profileStrategies?: ProfileStrategy[];
}