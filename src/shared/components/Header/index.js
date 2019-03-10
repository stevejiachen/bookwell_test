import styled from 'styled-components';
import React from 'react';
import Button from '@material-ui/core/Button/Button';

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    height: 48px;
    padding: 0 15px;
    width: 100%;
    @media (min-width: 576px) and (max-width: 768px) {
        margin-bottom: 30px;
    }
    @media (max-width: 576px) {
        margin-bottom: 10px;
    }
`;

const Header = () => {
    return (
        <HeaderWrapper>
            <a href="/" style={{ fontSize: 32, color: '#f37961', textDecoration: 'none' }}>
                <span>book</span>
                <span style={{ color: '#f9a791' }}>well</span>
            </a>
            <Button color={'primary'} style={{ position: 'relative', top: '-12px', right: 32 }}>
                login
            </Button>
        </HeaderWrapper>
    );
};

export default Header;
