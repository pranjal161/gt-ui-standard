import { DxcTable } from '@dxc-technology/halstack-react';
import { EyeIcon } from 'assets/svg';
import React from 'react';
import { getDescriptionValue } from 'utils/functions';
import { useTranslation } from 'react-i18next';

/**
 * Display contract information in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the contract in a Table
 */
const ContractTable = (props: any) => {
    const { t } = useTranslation();

    /**
     * Redirection to a contract
     * @param {item} item Resource that representing a contract
     * @returns {void} Return the link to the contract
     */

    return (
        <>
            {props.contractData && props.contractData._links && props.contractData._links.item ? (
                <>
                    <DxcTable>
                        <thead>
                            <tr>
                                <th>{t('contract:number')}</th>
                                <th>{t('contract:status')}</th>
                                <th>{t('_OWNER_NAME')}</th>
                                <th>{t('membership:display_id')}</th>
                                <th>{t('_ACTIONS')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.contractData._links.item.map((row: { [x: string]: { [x: string]: any } }, i: number) => (
                                <tr key={i}>
                                    <td>{row['summary']['contract:number']}</td>
                                    <td>
                                        {getDescriptionValue(
                                            row['summary']['contract:status'],
                                            'contract:status',
                                            props.contractData,
                                        )}
                                    </td>
                                    <td>
                                        {row['summary']['person:display_id']
                                            ? row['summary']['person:display_id']
                                            : row['summary']['organization:display_id']}
                                    </td>
                                    <td>{row['summary']['membership:display_id']}</td>
                                    {props.showPreview &&
                                    <td>
                                        <EyeIcon />
                                    </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </DxcTable>
                </>
            ) : (
                <DxcTable>
                    <thead>
                        <tr>
                            <th>{t('_CONTRACT_NUMBER')}</th>
                            <th>{t('_OWNER_NAME')}</th>
                            <th>{t('_RISK_DATA')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={12}>{t('_NO_RECORDS_FOUND')}</td>
                        </tr>
                    </tbody>
                </DxcTable>
            )}
        </>
    );
};

export default ContractTable;
