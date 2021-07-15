import React from 'react';
import { getCollectionItems } from 'utils/functions';
import useResponse from 'hooks/useResponse';

const OrgInfoSheet = (props: { hRef: string }) => {
    const [orgInfoSheetRes] = useResponse(props.hRef);
    // waiting for more info from API
    const items = orgInfoSheetRes && getCollectionItems(orgInfoSheetRes.data);

    return (
        <>
            {orgInfoSheetRes &&
                items.map((item:any) => (
                    <>{item.title}</>
                ))
            }
        </>
    );
}

export default OrgInfoSheet
