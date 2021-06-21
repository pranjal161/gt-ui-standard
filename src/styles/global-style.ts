import styled from 'styled-components';

export const StyledHoverRow = styled.tr`
    &:hover {
        background-color: #F7F7F7;
        cursor: pointer;
    }
`;

export const StyledLabel = styled.label`
width: ${(props: {width: number}) => (props.width ? props.width : 'unset')}%;
margin-right: 1%;
`;

export const StyledPaginator = styled.div`
    span {
        font-size: 12px !important;
    }

    div[mode="secondary"] {
        width: 35px !important;

        button {
            min-height: 35px !important;
        }
    }
`;
