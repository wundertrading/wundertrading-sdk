export interface Market {

    /** Exchange market identifier */
    code: string;

    /** Human-readable market symbol */
    viewSymbol?: string;

    /** Market expiration timestamp (UTC ms) */
    expiry?: number | null;

    /** Current ask price */
    ask?: number | null;

    /** Current bid price */
    bid?: number | null;

    /** Last traded price */
    last?: number | null;
}