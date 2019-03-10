import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import VenueCard from '../VenueCard';
import Grid from '@material-ui/core/Grid/Grid';
import PropTypes from 'prop-types';

const Category = (props) => {
    const { query, variables } = props;
    return (
        <Query query={query} variables={variables}>
            {({ loading, error, data }) => {
                if (loading) {
                    return <CircularProgress />;
                }
                const venues = props.suburbVenues ? data.suburbVenues.venues : data.popularVenues;
                if (venues.length === 0) {
                    return <div>no result</div>;
                }
                return (
                    <div style={{ marginTop: 15 }}>
                        <Grid container spacing={8}>
                            {venues.map((venue, index) => (
                                <Grid key={`${venue.id}${index}`} item xs={12} sm={6} md={4}>
                                    <VenueCard {...venue} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                );
            }}
        </Query>
    );
};

Category.propTypes = {
    variables: PropTypes.object,
    query: PropTypes.object,
    suburbVenues: PropTypes.bool,
};

export default Category;
