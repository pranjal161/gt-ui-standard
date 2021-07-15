import ChargesTable from './ChargesTable';
import React from 'react';
import Typo from 'components/Typography/Typo';
import useResponse from 'hooks/useResponse';

const ChargeManagement = (props: { hRef: string }) => {
    const { hRef } = props;
    const [response] = useResponse(hRef);
    const poolSplit = response && response.data['main_pool_split'];

    const PoolLabel = (props: { hRef: string }) => {
        const [poolResponse] = useResponse(props.hRef);

        return (
            <div className="mb-4">{poolResponse
                && <Typo variant={'title'} value={poolResponse.data['coverage_fund:label']} />}
            </div>
        )
    }

    return (
        <>
            {poolSplit && poolSplit.map((pool: any, index: number) => (
                <div key={index} className="mb-4">
                    <PoolLabel hRef={pool['product_component']} />
                    <ChargesTable
                        key={index}
                        data={response.data}
                        poolhRef={pool['product_component']} />
                </div>
            )
            )}
        </>
    )
}

export default ChargeManagement;