export const getLink = (response: any, linkName: string) => {
    if (response &&
        response._links &&
        response._links[linkName] &&
        response._links[linkName].href) {
        return response._links[linkName].href;
    } else {
        return null;
    }
}

/**
 *
 * @param {date}date The initial date for which days will be added
 * @param {days} days Number of days that will be added on the initial date
 * @returns {date} The new date
 */
export function addDays(date: any, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
}
