import i18next from 'i18next';
import previous from 'locales/en/_previous.json'

export const findAndSaveMissingTranslation = (namespace:string, field:string) => {
    const allPrevious:any = previous
    const result = allPrevious[field]
    saveToLocal(`${namespace}:${field}`, field, result)
}

export const saveToLocal = (propertyName:any,label:string, translation?:string) => {
    if (typeof propertyName !== 'string')
        return

    const namespaceAndField =propertyName.split(':')
    let field, namespace
    if (namespaceAndField.length === 2) {
        namespace = namespaceAndField[0]
        field = namespaceAndField[1]
    }
    else {
        namespace = 'common'
        field = propertyName
    }

    const storage = localStorage.getItem(namespace)
    let currentValue:any = storage?JSON.parse(storage):{}
    if(translation)
        currentValue[field] =translation
    else
        currentValue[field] = label && i18next.t(label)
    localStorage.setItem(namespace, JSON.stringify(currentValue))
}
