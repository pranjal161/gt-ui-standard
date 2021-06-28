import styled from 'styled-components';

interface NavRowProps {
    justify?: string,
    align?: string,
    height?: string
}

const MainNavContainer = styled.div`
    width: 100%;
    height: 128px;
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
    max-height: 50px;
    margin-left: 2rem;
    margin-top: 14px;
    cursor: pointer;

    @media screen and (max-width: 1300px) {
        max-height: 30px;
        margin-bottom: 15px;
    }
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

MainNavContainer.NavTabs = styled.div`
    z-index: 100;
    margin-top: 16px;
    min-width: 210px;
`;

MainNavContainer.SecondaryTabs = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 20px;
    flex-wrap: nowrap;
    overflow: hidden;
    align-items: flex-end;
`;

export { MainNavContainer }; 