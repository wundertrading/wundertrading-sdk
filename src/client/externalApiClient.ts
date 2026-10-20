import { BaseApiClient, Config } from './baseApiClient';
import { HmacSigner } from '../auth/hmac';

export type { Config } from './baseApiClient';

export class ExternalApiClient extends BaseApiClient {
    private readonly signer: HmacSigner;

    /**
     * @param apiKey
     * @param apiSecret
     * @param config
     */
    constructor(
        apiKey: string,
        apiSecret: string,
        config: Config = {}
    ) {
        super(config);

        this.signer = new HmacSigner(apiKey, apiSecret);

        this.http.interceptors.request.use((config) => {
            const headers = this.signer.sign(
                config.method || 'GET',
                config.url || '',
                this.config.recvWindow,
                config.data
                    ? JSON.stringify(config.data)
                    : ''
            );

            config.headers.set(headers);

            return config;
        });
    }
}
