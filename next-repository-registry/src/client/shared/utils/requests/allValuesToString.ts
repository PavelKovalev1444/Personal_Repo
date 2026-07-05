export const allValuesToString = (obj: Record<string, string | number | boolean | undefined>) =>
    Object.entries(obj).reduce(
        (acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = String(value);
            }
            return acc;
        },
        {} as Record<string, string>,
    );
