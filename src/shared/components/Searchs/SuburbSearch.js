import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import NoSsr from '@material-ui/core/NoSsr';
import { Query } from 'react-apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import MenuList from '@material-ui/core/MenuList/MenuList';
import gql from 'graphql-tag';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router';

const searchSuburbs = gql`
    query searchSuburbs($search: String!) {
        suburbs(first: 10, search: $search) {
            id
            name
            slug
            postcode
        }
    }
`;

const styles = (theme) => ({
    root: {
        backgroundColor: 'white',
        borderRadius: '4px',
        '&:hover': {
            borderColor: 'white',
        },
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    textField: {
        color: 'white',
    },
    searchButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 10px',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: theme.palette.primary.light,
        borderRadius: '4px',
    },
});

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSuburb: null,
            search: '',
        };
        this.name = 'suburbs';
    }
    handleSelect = (value) => {
        this.setState({
            selectedSuburb: value,
            search: `${value.label} ${value.postcode}`,
        });
        if (this.props.handleSelectSuburb) {
            this.props.handleSelectSuburb(value);
        }
    };
    handleInputChange = (e) => {
        this.setState({
            search: e.target.value,
            selectedSuburb: null,
        });
    };
    handleSearch = () => {
        const { match, history } = this.props;
        const { selectedSuburb } = this.state;
        const category = match.params.category;
        if (category && selectedSuburb) {
            history.push(
                `/venues-suburb/${category}/${selectedSuburb.value}/${selectedSuburb.postcode}`
            );
        }
    };
    render() {
        const { classes } = this.props;
        const { selectedSuburb, search } = this.state;
        const name = this.name;
        return (
            <NoSsr>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 2,
                        position: 'relative',
                    }}
                >
                    <TextField
                        id="outlined-with-placeholder"
                        style={{ width: this.props.inPageSearch && '98%' }}
                        placeholder="Your Postcode or Suburb"
                        margin="normal"
                        variant="outlined"
                        value={search}
                        className={classes.textField}
                        InputProps={
                            this.props.inPageSearch && {
                                classes: {
                                    root: this.props.classes.root,
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <div
                                            className={classes.searchButton}
                                            onClick={this.handleSearch}
                                        >
                                            Search <SearchIcon />
                                        </div>
                                    </InputAdornment>
                                ),
                            }
                        }
                        onChange={this.handleInputChange}
                    />
                    <Query query={searchSuburbs} variables={{ search }}>
                        {({ loading, error, data }) => {
                            if (loading) {
                                return null;
                            }
                            const suggestions = data[name].map((item) => ({
                                label: item.name,
                                value: item.slug,
                                name: item.name,
                                postcode: item.postcode,
                            }));
                            if (!selectedSuburb && search) {
                                return (
                                    <Paper
                                        style={{
                                            position: 'absolute',
                                            zIndex: 100,
                                            top: 80,
                                            left: 10,
                                            display: !selectedSuburb && search ? 'block' : 'none',
                                            width: '95%',
                                        }}
                                    >
                                        <MenuList>
                                            {suggestions.map((suggestion, index) => (
                                                <MenuItem
                                                    key={`${suggestion.value}-${index}`}
                                                    onClick={() => this.handleSelect(suggestion)}
                                                >
                                                    {suggestion.label} {suggestion.postcode}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Paper>
                                );
                            }
                            return null;
                        }}
                    </Query>
                </div>
            </NoSsr>
        );
    }
}

Search.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    inPageSearch: PropTypes.bool,
    classes: PropTypes.object,
    handleSelectSuburb: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(withRouter(Search));
