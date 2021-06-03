/* eslint-disable no-process-env */

import * as covea from 'theme/covea/mat'
import * as standard from 'theme/standard/mat'

export const getComponentStyle = (componentName: any) => {
    const standardTheme: any = standard;
    const coveaTheme:any = covea;
    const entryName = componentName + 'Style'
    if (process.env.REACT_APP_CUSTOMER_ID === 'standard')
        return standardTheme[entryName]
    else if (process.env.REACT_APP_CUSTOMER_ID === 'covea')
        return coveaTheme[entryName]
}
