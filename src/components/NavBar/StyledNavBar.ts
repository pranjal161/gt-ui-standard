import styled from 'styled-components';

interface NavRowProps {
    justify?: string,
    align?: string,
    height?: string
}

const MainNavContainer = styled.div`
    width: 100%;
    background-color: white;

    &::after {
        content: '';
        display: block;
        height: 2px;
        width: 100%;
        background-color: #D9D9D9;
        position: absolute;
        bottom: 0px;
    }
` as any;

MainNavContainer.NavRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${(props: NavRowProps) => (props.justify ? props.justify : 'space-between')};
    align-items: ${(props) => (props.align ? props.align : 'stretch')};
    height: ${(props) => (props.height ? props.height : 'auto')};
`;

MainNavContainer.LogoImg = styled.img.attrs((props) => ({
    src: props.src,
    alt: props.alt,
    title: props.title
}))`
    max-height: 32px;
    margin-left: 2rem;
    cursor: pointer;
`;

MainNavContainer.ActionButtonsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: center;
`;

MainNavContainer.SignedLinksContainer = styled.div`
    display: inline-flex;
    align-items: center;
    list-style: none;
`;

MainNavContainer.SecondaryViewButtonsContainer = styled.div`
    margin-left: 2rem;
    margin-right: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 200px;
`;

export { MainNavContainer }; 