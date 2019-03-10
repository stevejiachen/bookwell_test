import React from 'react';
import gql from 'graphql-tag';
import Category from '../../components/Category';
import PropTypes from 'prop-types';
import SearchInPage from '../../components/Searchs/SearchInPage';

const popularCategoryRegionQuery = gql`
    query venuesCategoryQuerySuburb($category: String, $suburb: String!) {
        suburbVenues(slug: $suburb) {
            venues(category: $category) {
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
    }
`;

const CityCategory = (props) => {
    const { params } = props.match;
    let variables;
    if (params.category === 'salons') {
        variables = {
            suburb: `${params.suburb}-${params.postcode}`,
        };
    } else {
        variables = {
            category: params.category,
            suburb: `${params.suburb}-${params.postcode}`,
        };
    }
    return (
        <div>
            <SearchInPage match={props.match} />
            <Category
                query={popularCategoryRegionQuery}
                variables={variables}
                match={props.match}
                suburbVenues
            />
        </div>
    );
};

CityCategory.propTypes = {
    match: PropTypes.object,
};

export default CityCategory;
