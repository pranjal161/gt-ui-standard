import { getLink, getTitle } from 'utils/functions';

import React from 'react';
import useResponse from 'hooks/useResponse';

const OrgInfoSheet = (props: { hRef: string }) => {
    const [partyRoleRes] = useResponse(props.hRef);
    // waiting for design
    const orgHref = partyRoleRes && getLink(partyRoleRes.data, 'party_role:person');
    const [orgRes] = useResponse(orgHref);

    return (
        <>
            {orgRes &&
                getTitle(orgRes.data)
            }
        </>
    );
}

export default OrgInfoSheet
