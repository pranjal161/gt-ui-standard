import {ContractIcon, PersonSmallIcon, TicketIcon} from 'assets/svg';
import React, {useCallback, useState} from 'react';
import {DxcDropdown} from '@dxc-technology/halstack-react';
import Typo from 'components/Typography/Typo';
import VerticalToolbar from 'components/VerticalToolBar/VerticalToolbar';
import {makeStyles} from '@material-ui/core/styles';

interface ItemProp {

    /**
     * id of item
     */
    id: string;

    /**
     * text or component to display
     */
    display: any;

    /**
     * controller for the content
     */
    controller: any;

}

interface generateProps {

    /**
     * Item list
     */
    [item: string]: ItemProp[]

}

const useStyles = makeStyles(() => ({
    root: {},
    cdkOveride: {
        height: '36px',
        overflow: 'hidden',
        marginLeft: '-20px',
        marginTop: '-10px',
    },
    headerTitle: {
        maxWidth:'300px',
        overflowWrap: 'break-word',
    }
}))

/**
 * Generate the props for the sidebar
 * configure the toolbar, the header and the content
 * Class is the entitytype : 'contract', 'person'
 * Instance is a specific Contract, person or else
 * @param {generateProps} items Item list
 * @param {boolean} defaultOpen  default value
 * @return {any} generated props
 */
export const useSidebar = (items: generateProps, defaultOpen: boolean) => {
    const classes = useStyles()
    const [entityClass, setEntityClass] = useState(Object.keys(items)[0])
    const [open, setOpen]: [any, any] = useState(defaultOpen)

    //We have to predefine the select instance for each entityClass, it will be the first item of each
    const initialState = Object.entries(items).reduce((acc, [key, values]) => ({...acc, [key]: values[0].id}), {})
    //Contains the selected instance per instanceClass
    const [entityInstanceSelections, setEntityInstanceSelections]: [any, any] = useState(initialState)
    //This is the displayed instance
    const currentInstance = items[entityClass].find((item) => item.id === entityInstanceSelections[entityClass]) || items[entityClass][0]

    //Generate the toolbar
    const onChangeToolbar = useCallback((value: string) => {
        setEntityClass(value)
        setOpen(true)
    }, [setEntityClass, setOpen])

    const toolbarItems = Object.keys(items).map((item) => ({value: item, display: getIcon(item)}))
    const toolbar = <VerticalToolbar items={toolbarItems} value={entityClass} onChange={onChangeToolbar}/>

    //Generate the header
    const options = items[entityClass].map((entity: any) => ({value: entity.id, label: entity.display}))
    const onChangeEntityInstanceSelections = (selection: any) => setEntityInstanceSelections((prev: any) => ({
        ...prev,
        [entityClass]: selection
    }))

    const HeaderTitle = (props: { value: string }) => <Typo className={classes.headerTitle} variant={'title'} value={props.value}/>
    const header = (<div className={classes.root}>
        {currentInstance && options.length === 1 && <HeaderTitle value={currentInstance.display}/>}
        {currentInstance && options.length > 1 &&
        <div className={classes.cdkOveride}>
            <DxcDropdown
                label={<HeaderTitle value={currentInstance.display}/>}
                size={'fitContent'}
                options={options}
                value={currentInstance.id}
                onSelectOption={onChangeEntityInstanceSelections}
            /></div>}
    </div>)

    const content = currentInstance && currentInstance.controller(currentInstance.id)
    const onToggle = useCallback(() => {
        setOpen((value: any) => !value)
    }, [setOpen])

    return {toolbar, header, content, open, onToggle, value: currentInstance}
}

const getIcon = (entityClass: string) => {
    let IconComponent: any
    switch (entityClass) {
        case 'contract':
            IconComponent = ContractIcon
            break;
        case 'person':
            IconComponent = PersonSmallIcon
            break;
        case 'ticket':
            IconComponent = TicketIcon
            break;
        default:
            const unKnow = () => <div>?</div>
            IconComponent = unKnow
    }

    return <IconComponent size={18}/>

}
