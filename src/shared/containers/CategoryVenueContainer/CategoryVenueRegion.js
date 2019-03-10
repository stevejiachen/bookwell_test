import React from 'react';
import gql from 'graphql-tag';
import Category from '../../components/Category';
import PropTypes from 'prop-types';
import SearchInPage from '../../components/Searchs/SearchInPage';
import CityRegionBoxBySuburb from '../../components/CityRegionBox/CityRegionBoxBySuburb';

const popularCategoryRegionQuery = gql`
    query PopularCategoryRegionQuery($category: String!, $city: String!, $region: String!) {
        popularVenues(first: 25, category: $category, city: $city, region: $region) {
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
            <CityRegionBoxBySuburb match={props.match} />
            <Category
                query={popularCategoryRegionQuery}
                variables={{
                    category: params.category,
                    city: params.city,
                    region: `${params.city}-${params.region}`,
                }}
                match={props.match}
            />
        </div>
    );
};

CityCategory.propTypes = {
    match: PropTypes.object,
};

export default CityCategory;
