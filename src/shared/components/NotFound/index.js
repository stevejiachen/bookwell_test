import React from 'react';
import PropTypes from 'prop-types';

const NotFound = (props) => {
    return <div>{props.children}</div>;
};

NotFound.propTypes = {
    children: PropTypes.object,
};

export default NotFound;
