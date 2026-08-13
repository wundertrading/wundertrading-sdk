import {Exchange} from "../market/exchange.model";
import {Status} from "../../constants/apiProfile.constants";

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
}