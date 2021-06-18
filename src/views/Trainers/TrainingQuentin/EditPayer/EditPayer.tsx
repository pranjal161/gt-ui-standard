// import { APIConfig } from 'configs/apiConfig';

import Dialog from 'theme/components/material/Dialog/Dialog';
import DialogActions from './components/DialogActions';
import DialogContent from './components/DialogContent';
import { PencilIcon } from 'assets/svg';
import React from 'react';
import { useTranslation } from 'react-i18next';

// import axios from 'utils/axios';
interface EditPayerProps {
    isVisible: boolean,
    setIsVisible?: Function,
    onChange: Function
}

const EditPayer = ({isVisible = false, setIsVisible = () => undefined, onChange }: EditPayerProps) => {

    const {t} = useTranslation(['person', 'common']);

    const [filters, setFilters] = React.useState<any>({});
    const [selectedPerson, setSelectedPerson] = React.useState<any>({});
    const [personsUrl, setPersonsUrl] = React.useState('');
    const [isSearching, setIsSearching] = React.useState<boolean>(false);

    const onSearchingChange = () => {
        setIsSearching(!isSearching);
    }

    /*  const testFindPersons = async (url: string) => {
        try {
            const res = await axios.get(url, {headers: APIConfig.defaultHeader});
            console.log({res});
        }
        catch (err) {
            console.log({err});
        }
    } */

    React.useEffect(() => {
        createPersonsUrl({...filters});
        console.log('Main :', filters)
    }, [filters]);

    const generateRequestFilters = (filters: any) => {
        if (Object.keys(filters).length === 0) {
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

    const createPersonsUrl = (filters: any) => {
        const fields = generateRequestFilters(filters);        
        setPersonsUrl(`http://20.33.40.147:13111/csc/insurance/persons${fields}`);
        
    }

    const manageData = (obj: any = {}) => {
        console.log(obj);
        setFilters({...obj.filters})
        setSelectedPerson({...obj.selectedRow});
    }

    return (
        <>
            <Dialog 
                icon={<PencilIcon size={35}/>}
                title={t('common:edit_payer')}

                content={
                    <DialogContent 
                        url={personsUrl} 
                        isVisible={isSearching} 
                        onChange={manageData} 
                        filters={filters} 
                    />
                }

                open={isVisible}
                fullWidth={true}
                
                actions={
                    <DialogActions 
                        data={{filters}} 
                        isSearching={isSearching} 
                        onSearch={() => onSearchingChange()} 
                        onModify={() => onChange(selectedPerson)} 
                        onCancel={() => setIsVisible(false)} 
                        onCreate={() => setIsVisible(false)} 
                    />
                }
            />
        </>
    )
}

export default EditPayer;