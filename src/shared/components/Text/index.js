import styled from 'styled-components';

const MainTitle = styled.div`
    font-size: 52px;
    color: #f37961;
    font-family: KollektifBold;
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: center;
    @media (max-width: 480px) {
        font-size: 32px;
        text-align: center;
    }
`;

const SubTitle = styled.div`
    font-size: 21px;
    color: #747474;
    font-family: Montserrat;
    font-weight: 300;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
    @media (max-width: 767px) {
        font-size: 18px;
        margin: 0 auto;
        max-width: 90%;
    }

    span {
        color: #f37961;
        font-size: 24px;
        @media (max-width: 1023px) {
            font-size: 21px;
        }
    }
`;

export { MainTitle, SubTitle };
