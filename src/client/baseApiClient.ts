import { DEFAULT_BASE_URL } from '../config';
import axios, {AxiosInstance, AxiosProxyConfig} from 'axios';

export interface Config {
    recvWindow?: number;
    baseURL?: string;
    proxy?: AxiosProxyConfig | false;
    httpsAgent?: any;
    validateRequests?: boolean;
    headers?: Record<string, string>;
}

export class BaseApiClient {
    protected readonly http: AxiosInstance;
    protected readonly config: Config;

    constructor(config: Config = {}) {
        this.config = {
            recvWindow: 60000,
            baseURL: DEFAULT_BASE_URL,
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
                ...this.config.headers
            },
            proxy: this.config.proxy,
            httpsAgent: this.config.httpsAgent
        });
    }

    getHttp(): AxiosInstance {
        return this.http;
    }

    getConfig(): Config {
        return this.config;
    }
}