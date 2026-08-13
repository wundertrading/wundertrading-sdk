import {Group, Status} from "../../constants/order.constants";

export interface Order {
    orderId: string;

    /** SHORT=true LONG=false */
    type?: boolean;

    orderGroup?: Group;

    status?: Status;

    createdAt?: string;

    updatedAt?: string;

    price?: number | null;

    amount?: number | null;

    cost?: number | null;

    volume?: number | null;

    commission?: number | null;

    commissionCost?: number | null;

    commissionUSD?: number | null;

    triggeredBy?: string | null;

    errorTransKey?: string | null;

    errorMessage?: string | null;
}