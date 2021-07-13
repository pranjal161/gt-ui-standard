import React from 'react';
import { getCollectionItems } from 'utils/functions';
import useResponse from 'hooks/useResponse';

const PersonInfoSheet = (props: { hRef: string }) => {
    const [personInfoSheetRes] = useResponse(props.hRef);
    // waiting for more info from API
    const items = personInfoSheetRes && getCollectionItems(personInfoSheetRes.data);

    return (
        <>
            {personInfoSheetRes &&
                items.map((item:any) => (
                    <>{item.title}</>
                ))
            }
        </>
    );
}

export default PersonInfoSheet
