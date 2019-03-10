import React from 'react';
import gql from 'graphql-tag';
import Category from '../../components/Category';
import PropTypes from 'prop-types';
import CityRegionBoxByRegion from '../../components/CityRegionBox/CityRegionBoxByRegion';
import SearchInPage from '../../components/Searchs/SearchInPage';

const popularCategoryCityQuery = gql`
    query PopularCategoryCityQuery($category: String!, $city: String!) {
        popularVenues(first: 25, category: $category, city: $city) {
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

const CityCategory = (props) => {
    const { params } = props.match;
    return (
        <div>
            <SearchInPage match={props.match} />
            <CityRegionBoxByRegion match={props.match} />
            <Category
                query={popularCategoryCityQuery}
                variables={{ category: params.category, city: params.city }}
                match={props.match}
            />
        </div>
    );
};

CityCategory.propTypes = {
    match: PropTypes.object,
};

export default CityCategory;
