import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SuburbSearch from './SuburbSearch';

const styles = (theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.light,
        borderRadius: '4px 4px 0 0',
        padding: '15px 15px 0 15px',
        color: 'white',
    },
    root: {
        backgroundColor: 'white',
        borderRadius: '4px',
        '&:hover': {
            borderColor: 'white',
        },
    },
    features: {
        minHeight: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    featureItem: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 30,
    },
});

const renderSearchText = (params) => {
    const { category, city, region } = params;
    if (region) {
        return `Book ${category} in ${region} ${city}`;
    }
    if (city) {
        return `Book ${category} in ${city}`;
    }
    return `Book ${category}`;
};

const SearchInPage = (props) => {
    const { classes, match } = props;
    return (
        <div className={classes.container}>
            <h1>{renderSearchText(match.params)}</h1>
            <SuburbSearch name="suburbs" className={classes.textField} inPageSearch />
            <div className={classes.features}>
                <div className={classes.featureItem}>
                    <CheckCircleIcon /> 100% Free to use
                </div>
                <div className={classes.featureItem}>
                    <CheckCircleIcon /> 2000+ local venues
                </div>
                <div className={classes.featureItem}>
                    <CheckCircleIcon /> Instant SMS Confirmation
                </div>
                <div className={classes.featureItem}>
                    <CheckCircleIcon /> Pay by Cash or Card
                </div>
            </div>
        </div>
    );
};

SearchInPage.propTypes = {
    classes: PropTypes.object,
    match: PropTypes.object,
};

export default withStyles(styles)(SearchInPage);
