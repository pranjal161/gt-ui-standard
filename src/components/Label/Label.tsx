import { formatValue, getDescriptionFromOneOf } from 'utils/functions';

import React from 'react';
import {StyledLabel} from 'styles/global-style';
import { useTranslation } from 'react-i18next';

/**
 * Display a LabelInline
 * @param {props} props Contains information related to the LabelInline
 * @returns {*} Return the LabelInline
 */
const Label = (props: { property: string; data: any; type?: string; width?: any }) => {
    const { t } = useTranslation();
    const { property, data, type } = props;
    let value, viewValue;

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
            {property && <StyledLabel width={props.width}>{t(property)}</StyledLabel>}
            <label dangerouslySetInnerHTML={{ __html: processDataOutput() }}></label>
        </span>
    );
};

export default Label;
