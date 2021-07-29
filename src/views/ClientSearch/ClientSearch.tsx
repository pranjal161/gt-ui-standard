import { DxcAlert, DxcButton, DxcDate, DxcInput, DxcRadio } from '@dxc-technology/halstack-react';
import React, { useState } from 'react';
import { format, isValid } from 'date-fns';

import { APIConfig } from 'configs/apiConfig';
import ClientTable from 'components/ClientTable/ClientTable';
import { SearchIcon } from 'assets/svg';
import { createSearchUrl } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import withActivity from 'hocs/withActivity';

// import clientTable from 'components/clientTable/clientTable';
// import Table from 'components/Table/Table';

export let urlPersons: string = APIConfig().defaultHostUrl + 'persons?_num=5';
export let urlOrgs: string = APIConfig().defaultHostUrl + 'organizations?_num=5';
export const PureClientSearch = ({ searchString }: any) => {
    const [isPerson, changeClientType] = useState(true);
    const urlClient = isPerson ? urlPersons : urlOrgs;
    const { t } = useTranslation();
    const makeUrl = (searchParams: any) => createSearchUrl(urlClient, searchParams);

    const [searchParams, setSearchParams]: [any, any] = useState([{ key: 'person:first_name_normalized', value: searchString }]);
    const [searchURL, setSearchURL]: [any, any] = useState(makeUrl(searchParams))

    const searchPerson = () => {
        setSearchURL(makeUrl(searchParams))
    };

    const updateSearchParams = (updatedValue: any, property: string) => {
        if (updatedValue && updatedValue.dateValue && isValid(updatedValue.dateValue)) {
            updatedValue = format(updatedValue.dateValue, 'yyyy-MM-dd');
        }
        if (searchParams.length === 0) {
            searchParams.push({ 'key': property, 'value': updatedValue })
        }
        searchParams.forEach((param: { key: string; value: string; }) => {
            if (param.key === property) {
                param.value = updatedValue;
            }
            else if (!searchParams.find((param: { key: string; value: string; }) => param.key === property)) {
                searchParams.push({ 'key': property, 'value': updatedValue })
            }
        });

        setSearchParams(searchParams);
        console.log(searchParams);
    };

    const getValue = (property: string) => {
        let value = '';
        const param = searchParams.length > 0 && searchParams.find((item: { key: string; }) => item.key === property);
        value = param?.value;

        return value;
    }

    return (
        <>
            <div className="d-flex">
                <div className="d-inline-block col-9 p-0">
                    <div className="align-center">
                        <DxcRadio
                            checked={isPerson}
                            label="Person"
                            labelPosition="after"
                            onClick={() => {
                                changeClientType(!isPerson);
                                setSearchParams([])
                            }}
                            margin="medium"
                        />
                        <DxcRadio
                            checked={!isPerson}
                            label="Organization"
                            labelPosition="after"
                            onClick={() => {
                                changeClientType(!isPerson);
                                setSearchParams([])
                            }}
                            margin="medium"
                        />
                    </div>
                    <div>
                        <DxcInput
                            label="Name / Legal Name"
                            value={isPerson ? getValue('person:first_name_normalized') : getValue('organization:legal_name')}
                            onChange={(updatedValue: string) => updateSearchParams(updatedValue, (isPerson ? 'person:first_name_normalized' : 'organization:legal_name'))}
                            margin="small"
                        />
                        <DxcInput
                            label={t('person:last_name')}
                            value={getValue('person:last_name')}
                            onChange={(updatedValue: string) => updateSearchParams(updatedValue, 'person:last_name')}
                            margin="small"
                        />
                        <DxcInput
                            label={isPerson ? t('person:client_number') : t('organization:client_number')}
                            value={isPerson ? getValue('person:client_number') : getValue('organization:client_number')}
                            onChange={(updatedValue: string) => updateSearchParams(updatedValue, (isPerson ? 'person:client_number' : 'organization:client_number'))}
                            margin="small"
                        />
                        <DxcInput
                            label={t('postal_address:postal_code')}
                            value={getValue('postal_address:postal_code')}
                            onChange={(updatedValue: string) => updateSearchParams(updatedValue, 'postal_address:postal_code')}
                            margin="small"
                        />
                        {isPerson && <div className="col-3">
                            <DxcDate
                                label={t('person:birth_date')}
                                format="dd-MM-yyyy"
                                value={getValue('person:birth_date')}
                                onChange={(updatedValue: string) => updateSearchParams(updatedValue, 'person:birth_date')}
                                margin="small"
                            />
                        </div>}

                    </div>
                </div>
                <div className="d-inline-flex col-3 p-0" style={{marginTop: '11%'}}>
                    <DxcButton
                        mode="text"
                        label={t('reset')}
                        onClick={() => setSearchParams([])}
                        margin="xxsmall"
                        size="large"
                    />
                    <DxcButton
                        mode="primary"
                        label={t('search')}
                        onClick={searchPerson}
                        margin="xxsmall"
                        iconPosition="after"
                        icon={<SearchIcon />}
                        size="large"
                    />
                </div>
            </div>
            <div className="col-12">
                <DxcAlert
                    type="info"
                    mode="inline"
                    inlineText={t('_PAGINATOR_WARNING')}
                    margin="xxsmall"
                />
            </div>
            {searchURL &&
                <ClientTable url={searchURL} />
            }
        </>
    );
}

export default () => withActivity(PureClientSearch, urlPersons);
