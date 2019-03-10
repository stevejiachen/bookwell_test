import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip/Chip';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import NotFound from '../NotFound';

const getRegionByCity = gql`
    query getRegionByCity($slug: String!, $category: String) {
        city(slug: $slug) {
            regions(category: $category) {
                id
                name
                slug
            }
            suburbs(category: $category) {
                id
                name
                slug
                postcode
            }
        }
    }
`;

const styles = (theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        padding: '15px',
        backgroundColor: 'rgb(245, 245, 245)',
        marginBottom: '20px',
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

const CityRegionBox = (props) => {
    const { classes, match } = props;
    const city = match.params.city;
    const category = match.params.category;
    return (
        <Query query={getRegionByCity} variables={{ category, slug: city }}>
            {({ loading, error, data }) => {
                if (loading) {
                    return <LinearProgress />;
                }
                if (
                    error ||
                    !data.city ||
                    (data.city.regions.length === 0 && data.city.suburbs.length === 0)
                ) {
                    return <NotFound>No regions found</NotFound>;
                }
                if (data.city.regions.length === 0 && data.city.suburbs.length !== 0) {
                    return (
                        <div className={classes.root}>
                            {data.city.suburbs.map((suburb) => (
                                <Link
                                    to={`/venues-suburb/${category}/${suburb.slug}/${
                                        suburb.postcode
                                    }`}
                                    key={suburb.id}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Chip
                                        className={classes.chip}
                                        color="primary"
                                        variant="outlined"
                                        label={suburb.name}
                                        onClick={() => {}}
                                    />
                                </Link>
                            ))}
                        </div>
                    );
                }
                return (
                    <div className={classes.root}>
                        {data.city.regions.map((region) => (
                            <Link
                                to={`/venues/${category}/${city}/${region.slug}`}
                                key={region.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <Chip
                                    className={classes.chip}
                                    color="primary"
                                    variant="outlined"
                                    label={region.name}
                                    onClick={() => {}}
                                />
                            </Link>
                        ))}
                    </div>
                );
            }}
        </Query>
    );
};

CityRegionBox.propTypes = {
    classes: PropTypes.object,
    match: PropTypes.object,
};

export default withStyles(styles)(CityRegionBox);
