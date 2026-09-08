import {Exchange} from "../market/exchange.model";
import {Status, CreateStatus, DeleteStatus} from "../../constants/apiProfile.constants";

export interface ApiProfile {

    /** Exchange info */
    exchange?: Exchange;

    /** API profile code */
    code: string;

    /** Profile status */
    status?: Status;

    /** Profile name */
    name?: string;

    /** Demo trading flag */
    demo?: boolean;

    // todo: balance?
}

export interface ApiProfileUpsert {
    info: string;
    masterCode: string;
    exchanges: Record<string, ExchangeStatus>;
    status: CreateStatus;
}

export interface ExchangeStatus {
    status: Status;
    assets: Record<string, AssetBalance>;
    exchangeResponse: unknown | null;
}

export interface AssetBalance {
    free: number;
    used: number;
    total: number;
}

export interface ApiProfileDelete {
    code: string;
    status: DeleteStatus;
}