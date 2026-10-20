import {BestBidAskLimitAfterMaxAttemptsReached, ExitOrderType, OrderType} from "../../../constants/strategy.constants";

interface ExitBestBidAskLimitSettingsRequest {
    "postOnly": boolean
}

interface EntryBestBidAskLimitSettingsRequest extends ExitBestBidAskLimitSettingsRequest {
    "maxAttempts": number | null,
    "afterMaxAttemptsReached": BestBidAskLimitAfterMaxAttemptsReached | null,
    "maxChaseDistance": number | null
}

export interface EntryOrderTypeRequest {
    orderType: OrderType;
    orderTypeSettings?: EntryBestBidAskLimitSettingsRequest | null;
}

export interface TakeProfitOrderTypeRequest {
    takeProfitOrderType?: ExitOrderType | null;
    takeProfitOrderTypeSettings?: ExitBestBidAskLimitSettingsRequest | null;
}

export interface StopLossOrderTypeRequest {
    stopLossOrderType?: ExitOrderType | null;
    stopLossOrderTypeSettings?: ExitBestBidAskLimitSettingsRequest | null;
}

