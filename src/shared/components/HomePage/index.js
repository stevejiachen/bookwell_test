import * as React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { MainTitle, SubTitle } from '../Text';
import { SearchHomePage } from '../Searchs';
import ServiceCard from '../ServiceCard';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const renderCategories = (data) => {
    if (data.loading) {
        return <CircularProgress />;
    }
    return (
        <Grid container spacing={8}>
            {data.categories.map((category) => {
                return (
                    <Grid key={category.id} item xs={6} sm={4} md={4}>
                        <ServiceCard {...category} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

const HomePage = (props) => {
    const { data } = props;
    return (
        <>
            <div style={{ marginBottom: 50 }}>
                <MainTitle>Search. Book. Enjoy.</MainTitle>
                <SubTitle>
                    <span>bookwell </span>Instantly book your next beauty or wellness experience.
                </SubTitle>
                <SearchHomePage data={data} />
            </div>
            <div style={{ marginLeft: 8, display: 'flex', justifyContent: 'center' }}>
                {renderCategories(data)}
            </div>
        </>
    );
};

HomePage.propTypes = {
    data: PropTypes.object,
};

const query = gql`
    query {
        categories {
            id
            name
            slug
        }
    }
`;

export default graphql(query)(HomePage);
