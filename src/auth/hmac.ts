import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

export class HmacSigner {
    constructor(
        private apiKey: string,
        private apiSecret: string
    ) {
    }

    sign(method: string, path: string, recvWindow: number|undefined, body: string) {
        const timestamp = Date.now().toString();
        const strRecvWindow = recvWindow ? recvWindow.toString() : "60000";
        const payload =
            method.toUpperCase()
            + "\n"
            + path
            + "\n"
            + timestamp
            + "\n"
            + strRecvWindow
            + "\n"
            + body;

        const signature = Base64.stringify(hmacSHA256(payload, this.apiSecret));

        return {
            'X-API-Key': this.apiKey,
            'X-Timestamp': timestamp,
            'X-Signature': signature,
            'X-Recv-Window': strRecvWindow
        };
    }
}
