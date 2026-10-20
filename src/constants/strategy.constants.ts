export enum Status {
    New = 'new',
    Entered = 'entered',
    Completed = 'completed',
    Canceled = 'canceled',
    Cancelling = 'cancelling',
    PanicExited = 'panic_exited',
    PanicExiting = 'panic_exiting',
    Unlinked = 'unlinked',
    Failed = 'failed',
}

export enum StatusLive {
    New = 'new',
    Entered = 'entered',
    Cancelling = 'cancelling',
    PanicExiting = 'panic_exiting'
}

export enum StatusHistory {
    Completed = 'completed',
    Canceled = 'canceled',
    PanicExited = 'panic_exited',
    Unlinked = 'unlinked',
    Failed = 'failed',
}

export enum ExitOrderType {
    Market = 'market',
    BestBidAskLimit = 'best_bid_ask_limit',
}

export enum OrderType {
    Market = 'market',
    Limit = 'limit',
    BestBidAskLimit = 'best_bid_ask_limit',
}

export enum StrategyGroupType {
    Classic = 'classic',
    Dca = 'dca',
}

export enum PairType {
    Spot = 'spot',
    Future = 'future',
}

export enum PortfolioType {
    Fixed = 'fixed',
    Percents = 'percents',
}

export enum TradeSide {
    Long = "long",
    Short = "short",
}

export enum AmountPerTradeType {
    Base = 'base',
    Quote = 'quote',
    Dollar = '$',
    Percents = 'percents',
    Contracts = 'contracts',
}

export enum ExtraOrderCostAveraging {
    Base = 'base',
    Quote = 'quote',
}

export enum BaseOn {
    EntryOrder = 'entry_order',
    AveragePrice = 'average_price',
}

export enum BestBidAskLimitAfterMaxAttemptsReached {
    Market = 'market',
    Cancel = 'cancel',
}
