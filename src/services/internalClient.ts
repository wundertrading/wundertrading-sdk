import { BaseTradingClient } from './baseClient';
import { Config } from '../client/baseApiClient';
import {InternalApiClient, InternalAuth} from '../client/internalApiClient';

export class InternalTradingClient extends BaseTradingClient {
    constructor(
        auth: InternalAuth,
        config: Config = {}
    ) {
        super(
            new InternalApiClient(
                auth,
                config
            )
        );
    }
}