import styled from 'styled-components';

const MainContent = styled.div`
    padding: 0;
    margin-bottom: 25px;
    padding-bottom: 75px;
    max-width: 920px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 1023px) and (min-width: 768px) {
        padding: 0 25px;
    }
    @media (max-width: 1023px) {
        margin-bottom: 0;
    }

    @media (min-width: 576px) and (max-width: 768px) {
        width: 650px;
        max-width: 100%;
    }
    @media (min-width: 768px) and (max-width: 992px) {
        padding-right: 15px;
        padding-left: 15px;
        width: 820px;
        max-width: 100%;
    }
    @media (min-width: 992px) {
        width: 960px;
        max-width: 100%;
    }
`;

export { MainContent };
