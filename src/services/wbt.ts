import {Config, WunderClient} from '../client';
import {ApiResponseUtil} from "../utils/apiResponse.util";
import {ApiRequestUtil} from "../utils/apiRequest.util";
import {PathUtil} from "../utils/path.util";
import {
    ExchangesQuery,
    PaginationQuery,
    ProfileFindManyQuery,
    StrategyFindManyQuery
} from "../models/query/query.model";
import {PaginatedResponse} from "../responses/paginated.response";
import {ApiProfile} from "../models/api_profile/apiProfile.model";
import {Exchange} from "../models/market/exchange.model";
import {Market} from "../models/market/market.model";
import {Strategy} from "../models/strategy/strategy.model";
import {TradeStrategyRequest} from "../models/strategy/requests/trade.model";
import {ActionResponse, TradeActionResponse} from "../responses/strategy/action.model";
import {validate} from "../validation/validator";
import {StrategyTradeSchema} from "../schemas/strategy/trade.schema";
import {SwingStrategyRequest} from "../models/strategy/requests/swing.model";
import {StrategySwingSchema} from "../schemas/strategy/swing.schema";
import {
    PaginationQuerySchema,
    StrategyFindManyQuerySchema,
    ProfileFindManyQuerySchema,
    ExchangesQuerySchema
} from "../schemas/query.schema";
import {Order} from "../models/strategy/order.model";
import {EditClassicStrategyRequest, EditDcaStrategyRequest} from "../models/strategy/requests/edit.model";
import {StrategyEditClassicSchema, StrategyEditDcaSchema} from "../schemas/strategy/edit.schema";

export class wbt {
    protected client: WunderClient;
    protected apiResponseUtil: ApiResponseUtil;
    protected apiRequestUtil: ApiRequestUtil;
    protected pathUtil: PathUtil;

    constructor(
        apiKey: string,
        apiSecret: string,
        config: Config = {}
    ) {
        this.client = new WunderClient(apiKey, apiSecret, config);
        this.apiResponseUtil = new ApiResponseUtil();
        this.apiRequestUtil = new ApiRequestUtil();
        this.pathUtil = new PathUtil();
    }

    // MARKETS
    async getExchanges(): Promise<Exchange[]> {
        return this.apiResponseUtil.resolve(
            this.client.getHttp().get('/open_api/exchanges')
        );
    }

    async getMarkets(params: ExchangesQuery | undefined = undefined): Promise<Record<string, Market[]>> {
        validate(
            ExchangesQuerySchema,
            params,
            this.client.getConfig().validateRequests
        );

        const path = this.pathUtil.glueWithQueryParams('/open_api/markets', params);
        return this.apiResponseUtil.resolve(this.client.getHttp().get(path));
    }

    // API PROFILES
    async getApiProfiles(params: ProfileFindManyQuery | undefined = undefined): Promise<PaginatedResponse<ApiProfile>> {
        validate(
            ProfileFindManyQuerySchema,
            params,
            this.client.getConfig().validateRequests
        );

        const path = this.pathUtil.glueWithQueryParams('/open_api/api_profiles', params);
        return await this.apiResponseUtil.resolve(this.client.getHttp().get(path));
    }

    // STRATEGY
    async getStrategiesLive(params: StrategyFindManyQuery | undefined = undefined): Promise<PaginatedResponse<Strategy>> {
        validate(
            StrategyFindManyQuerySchema,
            params,
            this.client.getConfig().validateRequests
        );

        const path = this.pathUtil.glueWithQueryParams('/open_api/strategies/live', params);
        return await this.apiResponseUtil.resolve(this.client.getHttp().get(path));
    }

    async getStrategiesHistory(params: StrategyFindManyQuery | undefined = undefined): Promise<PaginatedResponse<Strategy>> {
        validate(
            StrategyFindManyQuerySchema,
            params,
            this.client.getConfig().validateRequests
        );

        const path = this.pathUtil.glueWithQueryParams('/open_api/strategies/history', params);
        return await this.apiResponseUtil.resolve(this.client.getHttp().get(path));
    }

    async getStrategyById(idOrClientId: string): Promise<Strategy> {
        this.apiRequestUtil.ensureIdOrClientId(idOrClientId);
        return await this.apiResponseUtil.resolve(
            this.client.getHttp().get(`/open_api/strategies/${idOrClientId}`)
        );
    }

    async createStrategyTrade(body: TradeStrategyRequest): Promise<TradeActionResponse> {
        validate(
            StrategyTradeSchema,
            body,
            this.client.getConfig().validateRequests
        );

        return await this.apiResponseUtil.resolve(
            this.client.getHttp().post('/open_api/strategies/trade', body)
        );
    }

    async editClassicStrategyTrade(idOrClientId: string, body: EditClassicStrategyRequest): Promise<ActionResponse> {
        this.apiRequestUtil.ensureIdOrClientId(idOrClientId);
        validate(
            StrategyEditClassicSchema,
            body,
            this.client.getConfig().validateRequests
        );
        return await this.apiResponseUtil.resolve(
            this.client.getHttp().patch(`/open_api/strategies/${idOrClientId}/edit`, body)
        );
    }

    async editDcaStrategyTrade(idOrClientId: string, body: EditDcaStrategyRequest): Promise<ActionResponse> {
        this.apiRequestUtil.ensureIdOrClientId(idOrClientId);
        validate(
            StrategyEditDcaSchema,
            body,
            this.client.getConfig().validateRequests
        );
        return await this.apiResponseUtil.resolve(
            this.client.getHttp().patch(`/open_api/strategies/${idOrClientId}/edit`, body)
        );
    }

    async cancelStrategy(idOrClientId: string): Promise<ActionResponse> {
        this.apiRequestUtil.ensureIdOrClientId(idOrClientId);
        return await this.apiResponseUtil.resolve(
            this.client.getHttp().delete(`/open_api/strategies/${idOrClientId}/cancel`)
        );
    }

    async marketCloseStrategy(idOrClientId: string): Promise<ActionResponse> {
        this.apiRequestUtil.ensureIdOrClientId(idOrClientId);
        return await this.apiResponseUtil.resolve(
            this.client.getHttp().delete(`/open_api/strategies/${idOrClientId}/market_close`)
        );
    }

    async marketEnterStrategy(idOrClientId: string): Promise<ActionResponse> {
        this.apiRequestUtil.ensureIdOrClientId(idOrClientId);
        return await this.apiResponseUtil.resolve(
            this.client.getHttp().put(`/open_api/strategies/${idOrClientId}/market_enter`)
        );
    }

    async swingStrategy(idOrClientId: string, body: SwingStrategyRequest): Promise<TradeActionResponse> {
        this.apiRequestUtil.ensureIdOrClientId(idOrClientId);
        validate(
            StrategySwingSchema,
            body,
            this.client.getConfig().validateRequests
        );
        return await this.apiResponseUtil.resolve(
            this.client.getHttp().post(`/open_api/strategies/${idOrClientId}/swing`, body)
        );
    }

    async getHistoryOrders(profileStrategyId: string, params: PaginationQuery | undefined = undefined): Promise<PaginatedResponse<Order>> {
        this.apiRequestUtil.ensureProfileStrategyId(profileStrategyId);
        validate(
            PaginationQuerySchema,
            params,
            this.client.getConfig().validateRequests
        );
        return await this.apiResponseUtil.resolve(
            this.client.getHttp().get(`/open_api/strategies/history/orders/${profileStrategyId}`)
        );
    }
}
