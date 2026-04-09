import axios, {AxiosInstance, AxiosProxyConfig} from 'axios';
import {HmacSigner} from './auth/hmac';

export interface Config {
    recvWindow?: number,
    baseURL?: string,
    proxy?: AxiosProxyConfig | false,
    httpsAgent?: any,
    validateRequests?: boolean
}

export class WunderClient {
    private readonly http: AxiosInstance;
    private signer: HmacSigner;
    private readonly config: Config;

    /**
     * @param apiKey
     * @param apiSecret
     * @param {Config} config
     */
    constructor(
        apiKey: string,
        apiSecret: string,
        config: Config = {}
    ) {
        this.config = {
            recvWindow: 60000,
            baseURL: "https://wundertrading.com",
            proxy: false,
            httpsAgent: undefined,
            validateRequests: true,
            ...config
        };

        this.http = axios.create({
            baseURL: this.config.baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            proxy: this.config.proxy,
            httpsAgent: this.config.httpsAgent,
        });

        this.signer = new HmacSigner(apiKey, apiSecret);

        this.http.interceptors.request.use((config) => {
            const headers = this.signer.sign(
                config.method || "GET",
                config.url || "",
                this.config.recvWindow,
                config.data ? JSON.stringify(config.data) : ""
            );
            config.headers.set(headers);

            return config;
        });
    }

    getHttp(): AxiosInstance {
        return this.http;
    }

    getConfig(): Config {
        return this.config;
    }
}
