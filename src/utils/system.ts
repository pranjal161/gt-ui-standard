import i18n from 'i18next';

/**
 * Traduce on error and log it in console.error
 * use the system namespace
 * @param {string} errorCode An existing code of i18n "system" namespace
 * @param {any} param param to use in i18n interpolation
 * @return {void} no return
 */
export const logErrorByCode = (errorCode: string, param?:any) => {
    logErrorByMessage(errorCode + ': ' + i18n.t(`system:${errorCode}`, param), param.extra)
}

/**
 * Log the given error into console.error
 * @param {string} message to log
 * @param {string} extra data to log
 * @return {void} no return
 */
export const logErrorByMessage = (message?: string, extra?:any) => {
    if (message)
        console.error(message, extra)
}
