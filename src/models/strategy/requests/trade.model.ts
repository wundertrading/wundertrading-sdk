import {
    AmountPerTradeType,
    BaseOn,
    ExtraOrderCostAveraging,
    OrderType,
    TradeSide
} from "../../../constants/strategy.constants";

export interface TakeProfitRequest {

    /** Strict trigger price */
    price?: number | null;

    /** Price deviation (0–1 = 0%–100%) */
    priceDeviation?: number | null;

    /** Portfolio share (sum must equal 1) */
    portfolio: number;
}

export interface TradeStrategyRequest {

    /** Optional client strategy id */
    clientId?: string | null | undefined;

    /** Exchange code */
    exchangeCode: string;

    /** Market pair code */
    pairCode: string;

    /** API profiles to trade on */
    profilesCodes: string[];

    /** Trade direction */
    side: TradeSide;

    /** Order type */
    orderType: OrderType;

    /** Required for limit order */
    price?: number | null;

    /** Limit order TTL (minutes) */
    timeToLive?: number | null;

    /** Entry amount */
    amountPerTrade: number;

    /** Entry amount type */
    amountPerTradeType: AmountPerTradeType;

    /** Entry amount multiplier */
    amountPerTradeMultiplier?: number | null;

    /** Reference leverage */
    leverage?: number | null;

    /** DCA orders count */
    extraOrderCount?: number | null;

    /** DCA price deviation */
    extraOrderDeviation?: number | null;

    /** DCA volume multiplier */
    extraOrderVolumeMultiplier?: number | null;

    /** DCA deviation multiplier */
    extraOrderDeviationMultiplier?: number | null;

    /** DCA cost averaging mode */
    extraOrderCostAveraging?: ExtraOrderCostAveraging | null;

    /** Apply DCA for first safety order */
    applyDcaForFirstSafetyOrder?: boolean;

    /** Take profits */
    takeProfits?: TakeProfitRequest[];

    /** Take profit price averaging calculation method */
    takeProfitBaseOn?: BaseOn;

    /** Stop loss deviation */
    stopLoss?: number | null;

    /** Stop loss strict price */
    stopLossPrice?: number | null;

    /** Stop loss price averaging calculation method */
    stopLossBaseOn?: BaseOn;

    /** Move stop loss deviation */
    stopLossMove?: number | null;

    /** Break-even execution deviation */
    stopLossMoveExecute?: number | null;

    /** Trailing stop activation */
    trailingStopActivation?: number | null;

    /** Trailing stop execution */
    trailingStopExecute?: number | null;

    /** Reduce only */
    reduceOnly?: boolean;

    /** Keep position open */
    keepPositionOpen?: boolean;

    /** Place conditional orders on exchange */
    placeConditionalOrdersOnExchange?: boolean;
}