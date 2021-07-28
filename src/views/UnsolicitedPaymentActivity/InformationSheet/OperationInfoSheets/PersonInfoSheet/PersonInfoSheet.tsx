import { getLink, getTitle } from 'utils/functions';

import React from 'react';
import useResponse from 'hooks/useResponse';

const PersonInfoSheet = (props: { hRef: string }) => {
    const [partyRoleRes] = useResponse(props.hRef);
    // waiting for design
    const personHref = partyRoleRes && getLink(partyRoleRes.data, 'party_role:person');
    const [personRes] = useResponse(personHref);

    return (
        <>
            {personRes &&
                getTitle(personRes.data)
            }
        </>
    );
}

export default PersonInfoSheet
