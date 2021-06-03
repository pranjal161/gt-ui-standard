import React, { useEffect, useState } from 'react';

import DateInput from 'theme/components/material/DateInput/DateInput';
import axios from 'axios';

const TrainingPranjal = () => {
    const url = 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYScs';
    const [quoteResponse, setRes] = useState<any>();
    
    const headers = {
        'content-type': 'application/json',
        'accept': 'application/vnd.hal+json',
        'accept-language': 'en',
        'x-auth-username': 'vatsekov',
        'x-api-key': '48SmqcLpec3t1TO8EMzaDaamMz25pDZ469NFux41'
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(url, {headers: headers}).then((quoteRes: any) => {
            setRes(quoteRes.data);
        })
    }
    const updateDate = (newValue: any, id: string) => {
        const obj = {
            [id]: newValue
        }
        axios.patch(url, obj, { headers: headers }).then()
    };

    return (
        <>
            {quoteResponse &&
                <div className="col-4">
                    <DateInput
                        propertyName="quote:contract_start_date"
                        data={quoteResponse.data}
                        onBlurMethod={(newValue: any) => updateDate(newValue, 'quote:contract_start_date')}
                    />
                </div>
            }
        </>
    )

}

export default TrainingPranjal;