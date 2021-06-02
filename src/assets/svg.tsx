import './svg.css'
import PropTypes from 'prop-types';
import React from 'react';

const makeIcon = (svg: string,) => {
    const Icon = ({size = 24}) => (
        <svg
            className="SvgIcon-root"
            viewBox={`0 0 ${size} ${size}`}
            focusable="false"
            aria-hidden="true">
            <path
                d={svg}>
            </path>
        </svg>
    )
    Icon.displayName = 'Icon'
    Icon.propTypes = {
        size: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])

    };

    return React.memo(Icon)
}

export const HelpIcon = makeIcon('M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z')
export const ExtensionsIcon = makeIcon('M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z')
export const AddIcon = makeIcon('M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z')
export const AddBoxIcon = makeIcon('M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z')
