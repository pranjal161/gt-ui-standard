import React from 'react';
import { getCollectionItems } from 'utils/functions';
import useResponse from 'hooks/useResponse';

const FundsTable = ({ investmentFundsHRef }: any) => {
    // temporary display of funds
    const [response] = useResponse(investmentFundsHRef);
    const items = response && getCollectionItems(response.data); 

    return (
        <div className="m-3">
            {response &&
                <>
                    {items.map((item:any, index: number) => (
                        <div className="d-flex col-12" key={index}>{item.name}</div>
                    ))}
                </>
            }
        </div>
    )
}
;
export default FundsTable;

