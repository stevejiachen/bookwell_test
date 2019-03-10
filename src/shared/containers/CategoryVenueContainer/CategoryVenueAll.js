import React from 'react';
import gql from 'graphql-tag';
import Category from '../../components/Category';
import PropTypes from 'prop-types';
import CityRegionBoxAll from '../../components/CityRegionBox/CityRegionBoxAll';
import SearchInPage from '../../components/Searchs/SearchInPage';

const popularCategoryQuery = gql`
    query popularCategoryQuery($category: String!) {
        popularVenues(first: 25, category: $category) {
            id
            status
            name
            slug
            description
            location
            displayAddress
            fullAddress
            suburb {
                slug
                postcode
            }
            tags(first: 5) {
                id
                name
                slug
            }
            coverImage {
                name
            }
            reviewInfo {
                count
                rating
            }
        }
    }
`;

const CategoryVenueAll = (props) => {
    const { params } = props.match;
    return (
        <div>
            <SearchInPage match={props.match} />
            <CityRegionBoxAll match={props.match} />
            <Category
                query={popularCategoryQuery}
                variables={{ category: params.category, city: params.city }}
                match={props.match}
            />
        </div>
    );
};

CategoryVenueAll.propTypes = {
    match: PropTypes.object,
};

export default CategoryVenueAll;
