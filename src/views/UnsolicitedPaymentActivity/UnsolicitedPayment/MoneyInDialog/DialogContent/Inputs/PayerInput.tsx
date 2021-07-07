import { DxcInput } from '@dxc-technology/halstack-react';
import React from 'react';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

export interface PayerInputProps {

    /**
         * href
         * @description Person href
              */
    href: string
}

/**
 * Render an input to display payer display id
  * @param {PayerInputProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const PayerInput: React.FC<PayerInputProps> = (props: PayerInputProps) => {
    const { t } = useTranslation();
    const {
        href
    } = props

    const [response] = useResponse(href);

    return (
        <div className="col-4 mt-4">
            <DxcInput
                label={t('payer')}
                value={response ? response.data['person:display_id'] : ''}
                disabled={true}
            />
        </div>
    )
}

export default PayerInput;