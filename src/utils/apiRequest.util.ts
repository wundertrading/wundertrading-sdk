import {EnsureError} from "../errors/ensure.error";

export class ApiRequestUtil {
    /**
     * @throws {Error}
     */
    ensureIdOrClientId(idOrClientId: any): void {
        if (!idOrClientId) {
            throw new EnsureError("Entry parameter `idOrClientId` cannot be empty.");
        }
    }

    /**
     * @throws {Error}
     */
    ensureProfileStrategyId(profileStrategyId: any): void {
        if (!profileStrategyId) {
            throw new EnsureError("Entry parameter `profileStrategyId` cannot be empty.");
        }
    }
}
