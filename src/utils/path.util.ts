
export class PathUtil {
    glueWithQueryParams<T = any>(path: string, params: any): string {
        if (!params || !Object.keys(params).length) {
            return path;
        }

        const queryParams = new URLSearchParams(params);

        return `${path}?${queryParams}`;
    }
}
