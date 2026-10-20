import { BaseTradingClient } from './baseClient';
import { Config } from '../client/baseApiClient';
import { ExternalApiClient } from '../client/externalApiClient';

export class TradingClient extends BaseTradingClient {

    constructor(
        apiKey: string,
        apiSecret: string,
        config: Config = {}
    ) {
        super(
            new ExternalApiClient(
                apiKey,
                apiSecret,
                config
            )
        );
    }
}