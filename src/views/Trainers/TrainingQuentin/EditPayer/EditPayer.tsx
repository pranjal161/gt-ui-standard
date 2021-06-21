// import { APIConfig } from 'configs/apiConfig';

import Dialog from 'theme/components/material/Dialog/Dialog';
import DialogActions from './components/DialogActions';
import DialogContent from './components/DialogContent';
import { PencilIcon } from 'assets/svg';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface EditPayerProps {

    /**
     * Define if the dialog is visible or not.
     */
    isVisible: boolean,

    /**
     * Setter to set isVisible state value;
     */
    setIsVisible?: Function,

    /**
     * Function called when you decide to get a value from the Dialog.
     */
    onChange: Function
}

const EditPayer = ({isVisible = false, setIsVisible = () => undefined, onChange }: EditPayerProps) => {

    const {t} = useTranslation(['person', 'common']);

    const [filters, setFilters] = React.useState<any>({});
    const [selectedPerson, setSelectedPerson] = React.useState<any>({});
    const [personsUrl, setPersonsUrl] = React.useState('');
    const [isSearching, setIsSearching] = React.useState<boolean>(false);

    const onSearchingChange = () => {
        setIsSearching(true);
        createPersonsUrl(filters);
    }
    
    React.useEffect(() => {
        if (isSearching && Object.keys(filters).length > 0) {
            createPersonsUrl({...filters});
        }
    }, [filters]);

    const generateRequestFilters = (filtersObj: any) => {
        if (Object.keys(filtersObj).length === 0) {
            return
        }
        else {
            let strFilters = '?';

            Object.keys(filters).forEach((key: string) => {

                if (key === 'person:reference_country_code') {
                    strFilters += `${key}=${filters[key]}`;
                }
                else {
                    strFilters += `${key}=*${filters[key]}*`;
                }

                if (Object.keys(filters).indexOf(key) !== Object.keys(filters).length - 1) {
                    strFilters += '&';
                }
            });

            return strFilters;
        }
    }

    const createPersonsUrl = (filtersObj: any) => {
        const fields = generateRequestFilters(filtersObj);
        setPersonsUrl(`http://20.33.40.147:13111/csc/insurance/persons${fields}`);
    }

    const manageData = (obj: any = {}) => {
        setFilters({...obj.filters})
        setSelectedPerson({...obj.selectedRow});
    }

    const closeDialog = () => {
        setFilters({});
        setIsSearching(false);
        setIsVisible(false);
    }

    return (
        <>
            <Dialog 
                icon={<PencilIcon size={35}/>}
                title={t('common:edit_payer')}

                content={
                    <DialogContent
                        isSearching={isSearching}
                        url={personsUrl} 
                        onChange={manageData}
                    />
                }

                open={isVisible}
                fullWidth={true}
                
                actions={
                    <DialogActions 
                        filters={filters}
                        isSearching={isSearching}
                        onSearch={() => onSearchingChange()} 
                        onModify={() => {
                            onChange(selectedPerson);
                            closeDialog();
                        }}
                        onCancel={() => closeDialog()}
                        onCreate={() => closeDialog()}
                    />
                }
            />
        </>
    )
}

export default EditPayer;