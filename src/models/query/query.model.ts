interface ApiProfilesQuery {
    /** API profiles codes */
    apiProfiles?: string[];
}

export interface ExchangesQuery {
    /** Exchanges codes */
    exchanges?: string[];
}

interface StatusesQuery {
    statuses?: string[];
}

export interface PaginationQuery {
    /** Selected page */
    page?: number;

    /** Number of records per page */
    limit?: number;
}

export interface ProfileFindManyQuery extends PaginationQuery, ExchangesQuery, ApiProfilesQuery, StatusesQuery {}
export interface StrategyFindManyQuery extends PaginationQuery, ExchangesQuery, ApiProfilesQuery, StatusesQuery {}
