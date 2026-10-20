import {TakeProfitRequest} from "./trade.model";
import {BaseOn} from "../../../constants/strategy.constants";
import {StopLossOrderTypeRequest, TakeProfitOrderTypeRequest} from "./_order_type.model";

interface EditStrategyBaseRequest extends TakeProfitOrderTypeRequest, StopLossOrderTypeRequest {
    /** Take profits */
    takeProfits?: TakeProfitRequest[];

    /** Take profit price averaging calculation method */
    takeProfitBaseOn?: BaseOn;

    /** Stop loss strict price */
    stopLossPrice?: number | null;

    /** Stop loss price averaging calculation method */
    stopLossBaseOn?: BaseOn;

    /** Move stop loss strict price */
    stopLossMovePrice?: number | null;

    /** Break-even execution strict price */
    stopLossMoveExecutePrice?: number | null;

    /** Trailing stop activation */
    trailingStopActivation?: number | null;

    /** Trailing stop execution */
    trailingStopExecute?: number | null;

    /** Reduce only */
    reduceOnly?: boolean;
}

export interface EditClassicStrategyRequest extends EditStrategyBaseRequest {
    /** Place conditional orders on exchange */
    placeConditionalOrdersOnExchange?: boolean;
}

export interface EditDcaStrategyRequest extends EditStrategyBaseRequest {
    /** DCA orders count */
    extraOrderCount?: number | null;

    /** DCA price deviation */
    extraOrderDeviation?: number | null;

    /** DCA volume multiplier */
    extraOrderVolumeMultiplier?: number | null;

    /** DCA deviation multiplier */
    extraOrderDeviationMultiplier?: number | null;
}