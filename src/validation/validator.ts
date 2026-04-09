import { ZodSchema, ZodError } from "zod";

/**
 * @throws {ZodError}
 */
export function validate(
    schema: ZodSchema,
    data: any,
    validate: boolean = true
): void {
    if (!validate || !data) {
        return;
    }

    schema.parse(data);
}