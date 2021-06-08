/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react'

import Coverages from './Coverages';
import DateInput from 'theme/components/material/DateInput/DateInput';
import Label from 'components/Label/Label';
import SelectInput from 'components/SelectInput/SelectInput';
import TextArea from 'components/TextArea/TextArea';
import TextField from 'components/TextField/TextField';
import baContext from 'context/baContext';
import { getLink } from 'utils/functions';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';
import { useSelector } from 'react-redux';

/**
 * Quote new business POC to check uage of modified header
 * @constructor
 */
const Quote = () => {
    const { startActivity } = useActivity()
    const url = 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYScs';
    const { fetch, patch, post } = useAia();
    const context = useContext(baContext);
    const baId: string = context.baId ? context.baId : '';
    const [quoteUrl, setQuote] = useState('');
    const quoteResponse = useSelector((state: any) => (quoteUrl !== '' ? state.aia[baId][quoteUrl] : {}));
    const [risksUrl, setRiskUrl] = useState<string>();
    // hardcoding ARG url to define diff. use cases
    const ownerUrl = 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYT5Q/owners/ID-iy5KKS9M';
    const [owner, setOwner] = useState<string>();
    useEffect(() => {
        startActivity();
        getData();
    }, []);

    const getData = () => {
        fetch(url).then((quoteRes: any) => {
            setQuote(url);
            fetch(ownerUrl).then((response: any) => {
                setOwner(response.data);
            })
            if (getLink(quoteRes.data, 'quote:quote_risk_list')) {
                fetch(getLink(quoteRes.data, 'quote:quote_risk_list')).then((risksRes: any) => {
                    if (risksRes && risksRes.data && risksRes.data._links.item) {
                        setRiskUrl(risksRes.data._links.item.href)
                    }
                });
            }
        });
    };

    const patchFrequency = (newValue: any) => {
        const payload = {
            'quote:frequency': newValue
        }
        patch(url, payload).then(() => {
            const tarriff = url + '/tariff_calculation';
            post(tarriff, {}).then();
        });
    }

    const updateDate = (newValue: any, id: string) => {
        const obj = {
            [id]: newValue
        }
        patch(url, obj).then()
    };

    const ownerUpdate = (newValue: any) => {
        console.log(newValue)
    }

    return (
        <>
            {quoteResponse && quoteResponse.data &&
                <div className="m-2">
                    <div>
                        <SelectInput
                            data={quoteResponse.data}
                            propertyName="quote:frequency"
                            onChangeMethod={patchFrequency}
                        ></SelectInput>
                    </div>
                    <div>
                        <TextArea
                            propertyName="quote:description"
                            data={quoteResponse.data}
                        />
                    </div>
                    <div>
                        <TextField
                            onChangeMethod={ownerUpdate}
                            propertyName="quote_owner:email"
                            type="email"
                            data={owner}
                        />
                    </div>
                    <div>
                        <DateInput
                            propertyName="quote:contract_start_date"
                            data={quoteResponse.data}
                            onBlurMethod={(newValue: any) => updateDate(newValue, 'quote:contract_start_date')}
                        />
                    </div>
                    <div>
                        <DateInput
                            propertyName="quote_owner:birth_date"
                            data={owner}
                        />
                    </div>
                    <div>
                        <Label property="quote:period_cost" data={quoteResponse.data} />
                    </div>
                    <div>
                        <Label property="quote:frequency" data={quoteResponse.data} />
                    </div>
                    <div>
                        <Label property="quote:contract_start_date" data={quoteResponse.data} type="date" />
                    </div>
                </div>
            }
            {risksUrl &&
                <Coverages risks={risksUrl} />
            }
        </>
    )
}

export default Quote;