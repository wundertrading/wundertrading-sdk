import {BaseApiClient, Config} from './baseApiClient';

export interface InternalAuth {
    serviceId: string;
    serviceSecret: string;
    userId: string;
}

export class InternalApiClient extends BaseApiClient {
    constructor(
        auth: InternalAuth,
        config: Config = {}
    ) {
        super(config);

        this.http.interceptors.request.use((config) => {
            // Identify the trusted calling service
            config.headers.set(
                'X-Service-ID',
                auth.serviceId
            );

            // Authenticate the trusted calling service
            config.headers.set(
                'X-Service-Secret',
                auth.serviceSecret
            );

            // Identify the user on whose behalf the service is acting
            config.headers.set(
                'X-Service-User-ID',
                auth.userId
            );

            return config;
        });
    }
}