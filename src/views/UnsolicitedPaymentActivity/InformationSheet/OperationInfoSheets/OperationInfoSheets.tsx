import {AddFolderIcon, PaymentIcon} from 'assets/svg';
import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import Section from 'components/Section/Section';
import useResponse from 'hooks/useResponse';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {getCollectionItems} from 'utils/functions';
import OperationInfoSheet from './OperationInfoSheet/OperationInfoSheet';

export interface OperationInfoSheetsProps {

    /**
     * hRef of operation List
     */
    hRef: string

}

/**
 * Return the list of operation
 * Here, used for UP : operation:info_sheet_operation_list
 * @param {OperationInfoSheetsProps} hRef as list Href
 * @return {React.Component} List of operations
 */
const OperationInfoSheets: React.FC<OperationInfoSheetsProps> = ({hRef}: OperationInfoSheetsProps) => {
    const [response] = useResponse(hRef)
    const {t} = useTranslation()
    const operationCount = response && response.data._count
    const title = t('common:operation_list', {count: operationCount, context: 'unsolicited_payment'})

    const items = response && getCollectionItems(response.data)

    return (
        <Section title={title} icon={<PaymentIcon/>}>
            {items && items.map((item: any, index:number) => (
                <AccordionContainer key={index} title={ `Investment n° ${index+1}`} prefixActions={<AddFolderIcon/>}>
                    <OperationInfoSheet hRef={item.href}/>
                </AccordionContainer>)
            )}
        </Section>
    );
}

export default OperationInfoSheets;
