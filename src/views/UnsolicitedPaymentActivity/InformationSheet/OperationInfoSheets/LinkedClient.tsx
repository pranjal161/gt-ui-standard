import { BusinessIcon, DistributorIcon, PersonSmallIcon } from 'assets/svg';
import { getLink, getTitle } from 'utils/functions';

import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import OrgInfoSheet from './OrgInfoSheet/OrgInfoSheet';
import PersonInfoSheet from './PersonInfoSheet/PersonInfoSheet';
import React from 'react';
import Section from 'components/Section/Section';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

const LinkedClient = (props: { hRef: string }) => {
    const [payerResponse] = useResponse(props.hRef);
    const personInfolist = payerResponse && getLink(payerResponse.data, 'person:info_sheet_person_list');
    const orgInfolist = payerResponse && getLink(payerResponse.data, 'organization:info_sheet_organization_list');
    const { t } = useTranslation();
    const title = t('common:person/org');

    return (
        <Section title={title} icon={<DistributorIcon />}>
            <AccordionContainer title={getTitle(payerResponse?.data)?.toString()} 
                prefixActions={personInfolist ? <PersonSmallIcon /> : <BusinessIcon />}>
                {personInfolist && 
                <PersonInfoSheet hRef={personInfolist} />}
                {orgInfolist && 
                <OrgInfoSheet hRef={orgInfolist} />}
            </AccordionContainer>
        </Section>
    );
}

export default LinkedClient
