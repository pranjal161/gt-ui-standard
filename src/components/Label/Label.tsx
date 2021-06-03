import { formatValue, getDescriptionFromOneOf } from 'utils/functions';

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

/**
 * Display a Label
 * @param {props} props Contains information related to the Label
 * @returns {*} Return the Label
 */
const Label = (props: { property: string; data: any; type?: string; width?: any }) => {
    const { t } = useTranslation();
    const { property, data, type } = props;
    let value, viewValue;

    const StyledLabel = styled.label`
  width: ${(props: {width: number}) => (props.width ? props.width : 'unset')}px;
  margin-right: 1%;
`;

    // Functions to process Output
    /**
     * Retrieve description for a given data
     * @returns {*} Return the description
     */
    function processDataOutput() {
        if (data && data.hasOwnProperty(property)) {
            value = data[property];
            viewValue = getDescriptionFromOneOf(value, property, data);

            if (type) {
                viewValue = formatValue(value, type);
            }

            return viewValue ? viewValue : value;
        }
    }

    return (
        <span data-testid={property}>
            {property && <StyledLabel width={props.width}>{t(property)}:</StyledLabel>}
            <label dangerouslySetInnerHTML={{ __html: processDataOutput() }}></label>
        </span>
    );
};

export default Label;
