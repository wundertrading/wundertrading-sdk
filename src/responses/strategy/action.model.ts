import {NewStrategy} from "../../models/strategy/strategy.model";

export interface ActionResponse {
    code: number;
    result: {
        info: string
    };
}

export interface TradeActionResponse {
    code: number;
    result: {
        info: string,
        tradesDetails: NewStrategy[]
    };
}