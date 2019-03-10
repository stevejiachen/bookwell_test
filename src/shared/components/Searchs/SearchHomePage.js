import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import SuburbSearch from './SuburbSearch';
import CategorySearch from './CategorySearch';
import { withRouter } from 'react-router';

const styles = (theme) => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suburbSearch: '',
            categorySearch: '',
        };
    }
    handleSelectSuburb = (value) => {
        this.setState({
            suburbSearch: value,
        });
    };

    handleSelectCategory = (value) => {
        this.setState({
            categorySearch: value,
        });
    };

    handleSearch = () => {
        const { history } = this.props;
        const { suburbSearch, categorySearch } = this.state;
        if (suburbSearch && categorySearch) {
            history.push(
                `/venues-suburb/${categorySearch.value}/${suburbSearch.value}/${
                    suburbSearch.postcode
                }`
            );
            return;
        }
        if (suburbSearch) {
            history.push(`/venues-suburb/salons/${suburbSearch.value}/${suburbSearch.postcode}`);
            return;
        }
        if (categorySearch) {
            history.push(`/venues/${categorySearch.value}`);
        }
    };

    render() {
        const { data } = this.props;
        return (
            <div style={{ display: 'flex' }}>
                <SuburbSearch handleSelectSuburb={this.handleSelectSuburb} />
                <CategorySearch
                    data={data}
                    handleSelectCategory={this.handleSelectCategory}
                    handleSearch={this.handleSearch}
                />
            </div>
        );
    }
}

Search.propTypes = {
    data: PropTypes.object,
    history: PropTypes.object,
};

export default withStyles(styles)(withRouter(Search));
