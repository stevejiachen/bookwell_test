import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip/Chip';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import NotFound from '../NotFound';

const getCityByCategories = gql`
    query getCityByCategories($category: String!) {
        category(slug: $category) {
            cities {
                id
                name
                slug
                regions(category: $category) {
                    id
                    name
                }
                suburbs(category: $category) {
                    id
                    name
                }
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
    const category = match.params.category;
    return (
        <Query query={getCityByCategories} variables={{ category }}>
            {({ loading, error, data }) => {
                if (loading) {
                    return <LinearProgress />;
                }
                if (error || !data.category || data.category.cities.length === 0) {
                    return <NotFound>No cities found</NotFound>;
                }
                return (
                    <div className={classes.root}>
                        {data.category.cities.map((city) => (
                            <Link
                                to={`/venues/${match.params.category}/${city.slug}`}
                                key={city.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <Chip
                                    className={classes.chip}
                                    color="primary"
                                    variant="outlined"
                                    label={city.name}
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
