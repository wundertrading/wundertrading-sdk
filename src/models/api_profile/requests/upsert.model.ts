import {MarginMode, TradeMode} from "../../../constants/apiProfile.constants";

export interface ApiProfileBaseRequest {
    secret?: string | null;
    marginMode?: MarginMode;
    tradeMode?: TradeMode;
    password?: string | null;
    applicationId?: string | null;
}

export interface ApiProfileCreateRequest extends ApiProfileBaseRequest {
    api: string;
    name: string;
    exchangeFamily: string;
}

export interface ApiProfileEditRequest extends ApiProfileBaseRequest {
    api?: string | null;
    name?: string | null;
    exchangeFamily?: string | null;
    paperTrading?: boolean;
}