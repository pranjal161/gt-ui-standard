import React, { useEffect, useState } from 'react';

import Label from 'components/Label/Label';
import axios from 'axios';

const TrainingShivani = () => {
    const url = 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYScs';
    const [quoteResponse, setRes] = useState();

    const headers = {
        'content-type': 'application/json',
        'accept': 'application/vnd.hal+json',
        'accept-language': 'en',
        'x-auth-username': 'vatsekov',
        'x-api-key': '48SmqcLpec3t1TO8EMzaDaamMz25pDZ469NFux41'
    }

    useEffect(() => {
        axios.get(url, { headers: headers }).then((quoteRes: any) => {
            setRes(quoteRes.data);
        })
    }, []);

    return (
        <>
            {quoteResponse &&
                <>
                    <div className="col-4">
                        <Label property="quote:contract_start_date" data={quoteResponse} type="date" />
                    </div>
                </>
            }
        </>
    )

};
export default TrainingShivani;