import { BusinessIcon, DistributorIcon, PersonSmallIcon } from 'assets/svg';

import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import OrgInfoSheet from './OrgInfoSheet/OrgInfoSheet';
import PersonInfoSheet from './PersonInfoSheet/PersonInfoSheet';
import React from 'react';
import Section from 'components/Section/Section';
import { getCollectionItems } from 'utils/functions';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

const LinkedClient = (props: { hRef: string, inquiry: string }) => {
    const [contractResponse] = useResponse(props.hRef + '/party_roles?'+ props.inquiry);
    const list = contractResponse && getCollectionItems(contractResponse.data);

    const { t } = useTranslation();
    const title = t('common:person/org');

    return (
        <Section title={title} icon={<DistributorIcon />}>
            {list && list.map((item:any, index:number) => (
                <span key={index}>
                    <AccordionContainer
                        title={item.title}
                        prefixActions={item.summary['party_role:party_type'] === 'person' ? <PersonSmallIcon /> : <BusinessIcon />}>
                        {item.summary['party_role:party_type'] === 'person' ? 
                            <PersonInfoSheet hRef={item.href} /> :
                            <OrgInfoSheet hRef={item.href} />}
                    </AccordionContainer>
                </span>
            ))}

        </Section>
    );
}

export default LinkedClient
