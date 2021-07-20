import { formatValue, getDescriptionFromOneOf, getLink } from 'utils/functions';

import { DxcTable } from '@dxc-technology/halstack-react';
import React from 'react';
import useActivity from 'hooks/useActivity';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

const MoneyInSummary = (props: { hRef: string }) => {
    const [UPResponse] = useResponse(props.hRef);
    const moneyInHref = UPResponse && getLink(UPResponse.data, 'cscaia:money_in')
    const [moneyInRes] = useResponse(moneyInHref);
    const { activityProps } = useActivity()
    const { mainEntityHRef } = activityProps;
    const [contractRes] = useResponse(mainEntityHRef)
    const { t } = useTranslation();

    const columns: any = [
        { property: 'contract:number', data: contractRes },
        { property: 'money_in:payment_type', data: moneyInRes },
        { property: 'operation:amount', type: 'currency', data: moneyInRes },
        { property: 'operation:currency_code', data: moneyInRes },
        { property: 'money_in:receipt_date', type: 'date', data: moneyInRes },
    ];

    return (<>
        <DxcTable>
            <thead>
                <tr>
                    {columns.map((item: any, key: number) => (
                        <th key={key}>{t(item.property)}</th>
                    ))
                    }
                </tr>
            </thead>
            <tbody>
                {moneyInRes && contractRes && (
                    columns.map((item: any, key: number) => (
                        <>{item.type && item.data.data[item.property] ?
                            <td key={key}>{formatValue(item.data.data[item.property], item.type)}</td>
                            : <td key={key}>{getDescriptionFromOneOf(item.data.data[item.property], item.property, item.data.data)}</td>
                        }
                        </>
                    ))
                )
                }
            </tbody>
        </DxcTable>
    </>)

}

export default MoneyInSummary