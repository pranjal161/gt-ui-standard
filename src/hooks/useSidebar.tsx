import {DxcDropdown} from '@dxc-technology/halstack-react';
import {makeStyles} from '@material-ui/core/styles';
import {ContractIcon, PersonSmallIcon, TicketIcon} from 'assets/svg';
import Typo from 'components/Typography/Typo';
import VerticalToolbar from 'components/VerticalToolBar/VerticalToolbar';
import React, {useState} from 'react';

interface ItemProp {

    /**
     * text or component to display
     */
    display: any;

    /**
     * id of item
     */
    id: string;
}

interface generateProps {

    /**
     * Item list
     */
    [item: string]: ItemProp[]
}

const useStyles = makeStyles((theme) => ({
    root:{
    },
    cdkOveride: {
        height:'30px',
        overflow:'hidden',
        marginLeft: '-20px',
        marginTop: '-16px',
    },
}))

/**
 * Generate the props for the sidebar
 * configure the toolbar, the header and the content
 * Class is the entitytype : 'contract', 'person'
 * @param {generateProps} items Item list
 * @return {any} generated props
 */
export const useSidebar = (items: generateProps) => {
    const classes = useStyles()
    const [entityClass, setEntityClass] = useState(Object.keys(items)[0])
    const HeaderTitle = (props: { value: string }) => <Typo variant={'title'} value={props.value}/>

    //We have to predefine the select instance for each entityClass
    const initialState = Object.entries(items).reduce((acc, [key, values]) => ({...acc, [key]: values[0].id}), {})
    //Contains the selected instance per instanceClass
    const [entityInstanceSelections, setEntityInstanceSelections]: [any, any] = useState(initialState)
    //This is the instance displayed
    const currentInstance = items[entityClass].find((item) => item.id === entityInstanceSelections[entityClass])

    //Generate the toolbar
    const onChangeToolbar = (value: string) => setEntityClass(value)
    const toolbarItems = Object.keys(items).map((item) => ({value: item, display: getIcon(item)}))
    const toolbar = <VerticalToolbar items={toolbarItems} onChange={onChangeToolbar}/>

    //Generate the header
    const options = items[entityClass].map((entity: any) => ({value: entity.id, label: entity.display}))
    const onChangeEntityInstanceSelections = (selection: any) => setEntityInstanceSelections((prev: any) => ({
        ...prev,
        [entityClass]: selection
    }))

    console.log('currentInstance', currentInstance)
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

    return {toolbar, header}
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
    }

    return <IconComponent size={18}/>

}
