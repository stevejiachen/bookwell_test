import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip/Chip';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';

const suburbByRegion = gql`
    query getSuburbByRegion($region: String!) {
        region(slug: $region) {
            suburbs {
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
        backgroundColor: 'rgb(245, 245, 245)',
        marginBottom: '20px',
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

const CityRegionBox = (props) => {
    const { classes, match } = props;
    const { city, category, region } = match.params;
    return (
        <Query query={suburbByRegion} variables={{ region: `${city}-${region}` }}>
            {({ loading, error, data }) => {
                if (loading) {
                    return null;
                }
                if (error || !data.region || data.region.suburbs.length === 0) {
                    return <NotFound>No suburbs found</NotFound>;
                }
                return (
                    <div className={classes.root}>
                        {data.region.suburbs.map((suburb) => (
                            <Link
                                to={`/venues-suburb/${category}/${suburb.slug}/${suburb.postcode}`}
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
            }}
        </Query>
    );
};

CityRegionBox.propTypes = {
    classes: PropTypes.object,
    match: PropTypes.object,
};

export default withStyles(styles)(CityRegionBox);
