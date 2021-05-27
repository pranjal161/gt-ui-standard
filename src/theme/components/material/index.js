/* eslint-disable no-process-env */
import * as standard from 'theme/standard/mat'
import * as covea from 'theme/covea/mat'

export const getComponentStyle = (componentName) => {

    const entryName = componentName + 'Style'
    if (process.env.REACT_APP_CUSTOMER_ID === 'standard')
        return standard[entryName]
    else if (process.env.REACT_APP_CUSTOMER_ID === 'covea')
        return covea[entryName]
}
