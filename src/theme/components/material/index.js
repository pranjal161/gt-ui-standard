import * as standard from 'theme/standard/mat'
//const project = 'standard'
export const getComponentStyle = (componentName) => {
    console.log('standard', componentName, standard)
    const entryName = componentName + 'Style'

    return standard[entryName]
}
