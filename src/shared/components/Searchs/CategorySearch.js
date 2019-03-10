import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import NoSsr from '@material-ui/core/NoSsr';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import MenuList from '@material-ui/core/MenuList/MenuList';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
        minWidth: '300px',
    },
    searchButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 10px',
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
            searchFocus: false,
        };
        this.name = 'categories';
    }
    handleSelect = (value) => {
        this.setState({
            selectedCategory: value,
            search: `${value.label}`,
        });
        if (this.props.handleSelectCategory) {
            this.props.handleSelectCategory(value);
        }
    };
    handleInputChange = (e) => {
        this.setState({
            search: e.target.value,
            selectedCategory: null,
        });
    };
    render() {
        const { data, classes } = this.props;
        const name = this.name;
        const { selectedCategory, search } = this.state;
        let suggestions = [];
        if (data[name] && data[name].length > 0) {
            suggestions = data[name]
                .map((item) => ({
                    label: item.name,
                    value: item.slug,
                    name: item.name,
                }))
                .filter((suggestion) => suggestion.value.includes(this.state.search));
        }
        return (
            <NoSsr>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        position: 'relative',
                    }}
                >
                    <TextField
                        id="outlined-with-placeholder"
                        style={{ flex: 2 }}
                        placeholder="Find Service or Treatment"
                        margin="normal"
                        variant="outlined"
                        value={search}
                        onChange={this.handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <div
                                        className={classes.searchButton}
                                        onClick={this.props.handleSearch}
                                    >
                                        Search <SearchIcon />
                                    </div>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Paper
                        style={{
                            position: 'absolute',
                            zIndex: 100,
                            top: 80,
                            left: 10,
                            display: !selectedCategory && search ? 'block' : 'none',
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
                </div>
            </NoSsr>
        );
    }
}

Search.propTypes = {
    data: PropTypes.object,
    handleSelectCategory: PropTypes.func,
    classes: PropTypes.object,
    handleSearch: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(Search);
