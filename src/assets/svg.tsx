import './svg.css'

import PropTypes from 'prop-types';
import React from 'react';

const makeIcon = (svg: string,) => {
    const Icon = ({size = 24, color = 'inherited'}) => (
        <svg
            className="SvgIcon-root"
            viewBox={'0 0 24 24'}
            height={size}
            width={size}
            focusable="false"
            aria-hidden="true"
            color={color}>
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
        ]),
        color: PropTypes.string

    };

    return React.memo(Icon)
}

export const HelpIcon = makeIcon('M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z')
export const ExtensionsIcon = makeIcon('M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z')
export const AddIcon = makeIcon('M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z')
export const AddBoxIcon = makeIcon('M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z')
export const PersonSmallIcon = makeIcon('M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z')
export const CloseIcon = makeIcon('M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z')
export const TicketIcon = makeIcon('M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z')
export const ContractIcon = makeIcon('M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z')
export const ContactIcon = makeIcon('M13.17,4L18,8.83V20H6V4H13.17 M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2L14,2z M12,14 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z M16,17.43c0-0.81-0.48-1.53-1.22-1.85 C13.93,15.21,12.99,15,12,15c-0.99,0-1.93,0.21-2.78,0.58C8.48,15.9,8,16.62,8,17.43V18h8V17.43z')
export const BusinessIcon = makeIcon('M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z')
export const PaymentIcon = makeIcon('M4 6h16v2H4zm0 6h16v6H4z')
export const DistributorIcon = makeIcon('M20 0H4v2h16V0zM4 24h16v-2H4v2zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25S9.75 10.24 9.75 9 10.76 6.75 12 6.75zM17 17H7v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z')
export const DoubleArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" focusable="false"
        aria-hidden="true" className="SvgIcon-root">
        <g>
            <g>
                <polygon points="15.5,5 11,5 16,12 11,19 15.5,19 20.5,12"/>
                <polygon points="8.5,5 4,5 9,12 4,19 8.5,19 13.5,12"/>
            </g>
        </g>
    </svg>)
export const DoubleArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" focusable="false"
        aria-hidden="true" className="SvgIcon-root">
        <g>
            <g>
                <polygon points="15.5,5 11,5 16,12 11,19 15.5,19 20.5,12" transform="rotate(180, 12, 12)"/>
                <polygon points="8.5,5 4,5 9,12 4,19 8.5,19 13.5,12" transform="rotate(180, 12, 12)"/>
            </g>
        </g>
    </svg>)
export const OpenInNewWindowIcon = makeIcon('M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z')
export const OpenInNewTabIcon = makeIcon('M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z')
export const SearchIcon = makeIcon('M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z')
export const EyeIcon = makeIcon('M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 000 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 000-1zm-9.87 4a3.5 3.5 0 113.5-3.5 3.5 3.5 0 01-3.5 3.5z')
export const LeftChevronIcon = makeIcon('M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z')
export const RightChevronIcon = makeIcon('M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z')
export const RightArrow = makeIcon('M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z')
export const LeftArrow = makeIcon('M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z')
export const ThreeDots = makeIcon('M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z')
export const Bell = makeIcon('M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z')
export const PlusSquare = makeIcon('M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2zm2-10h4V7h2v4h4v2h-4v4h-2v-4H7v-2z')
export const History = makeIcon('M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z')
export const CrossIcon = makeIcon('M10 1.6a8.4 8.4 0 100 16.8 8.4 8.4 0 000-16.8zm4.789 11.461L13.06 14.79 10 11.729l-3.061 3.06L5.21 13.06 8.272 10 5.211 6.939 6.94 5.211 10 8.271l3.061-3.061 1.729 1.729L11.728 10l3.061 3.061z')
export const RightActiveArrow = makeIcon('M11.293 17.293l1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z')
export const PencilIcon = makeIcon('M8.707 19.707L18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 00-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 000-2.828L19.414 3a2 2 0 00-2.828 0L15 4.586 19.414 9 21 7.414z')
export const MoreVert = makeIcon('M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z')
export const CircleFull = () => (
    <svg className="SvgIcon-root" viewBox="0 0 24 24" height="24px" width="24px">
        <circle cx="12" cy="12" r="8">
        </circle>
    </svg>
);
export const NotificationBellAdd = makeIcon('M16,14v3H8v-7c0-2.21,1.79-4,4-4c0.85,0,1.64,0.26,2.28,0.72l1.43-1.43c-0.64-0.51-1.39-0.88-2.21-1.09V3.5 C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5v0.7C7.91,4.86,6,7.21,6,10v7H4v2h16v-2h-2v-3H16z M12,22c1.1,0,2-0.9,2-2h-4 C10,21.1,10.9,22,12,22z M24,8h-3V5h-2v3h-3v2h3v3h2v-3h3V8z')
export const MaterialEye = makeIcon('M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z')
export const FilterIcon = makeIcon('M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z')
export const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="SvgIcon-root" height="24px" viewBox="0 0 24 24" width="24px"
        fill="#000000">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>
);
export const ErrorIcon = makeIcon('M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z')
export const ContactsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="SvgIcon-root" height="16px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none"/>
        <path d="M20 0H4v2h16V0zM4 24h16v-2H4v2zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25S9.75 10.24 9.75 9 10.76 6.75 12 6.75zM17 17H7v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z"/>
    </svg>    
);
export const SquaredAddIcon = makeIcon('M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z');
