export enum Status {
    Active = "active",
    NoAssets = "no_assets",
    Error = "error",
    Disabled = "disabled",
}

export enum CreateStatus {
    Success = "success",
    Error = "error"
}

export enum DeleteStatus {
    Deleted = "deleted",
    Error = "error"
}

export enum MarginMode {
    Cross = "cross",
    Isolated = "isolated"
}

export enum TradeMode {
    Auto = "auto",
    OneWayMode = "one_way_mode",
    HedgeMode = "hedge_mode"
}