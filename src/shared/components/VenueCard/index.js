import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse/Collapse';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarRatings from 'react-star-ratings';
import classnames from 'classnames';

const styles = (theme) => ({
    media: {
        height: 200,
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class VenueCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }
    handleExpandClick = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
    };
    getHref = () => {
        const { slug, suburb } = this.props;
        return `https://www.bookwell.com.au/venue/${slug}/${suburb.slug}/${suburb.postcode}`;
    };
    render() {
        const {
            classes,
            coverImage,
            name,
            fullAddress,
            tags,
            description,
            reviewInfo,
        } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <a href={this.getHref()} target="_blank" rel="noopener noreferrer">
                        <CardMedia
                            className={classes.media}
                            image={
                                coverImage
                                    ? `https://d3csnx51acnebp.cloudfront.net/530x353/salon_images/${
                                          coverImage.name
                                      }`
                                    : ''
                            }
                            title="Contemplative Reptile"
                        />
                    </a>
                    <CardContent>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '50%' }}>
                                <Typography gutterBottom variant="subtitle1" noWrap>
                                    {name}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    width: '50%',
                                    justifyContent: 'flex-end',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <StarRatings
                                    rating={reviewInfo.rating || 0}
                                    numberOfStars={5}
                                    starSpacing={'0'}
                                    starDimension={'15'}
                                />
                                <div>{`(${reviewInfo.count})`}</div>
                            </div>
                        </div>
                        <Typography gutterBottom noWrap variant="subtitle2">
                            {fullAddress}
                        </Typography>
                        <Typography component="p" noWrap style={{ color: 'grey' }}>
                            {tags.map((tag) => tag.name).join(', ')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Button size="small" color="primary">
                        <a
                            target="_blank"
                            href={this.getHref()}
                            style={{ textDecoration: 'none' }}
                            rel="noopener noreferrer"
                        >
                            Book Now
                        </a>
                    </Button>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{description}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

VenueCard.propTypes = {
    classes: PropTypes.object.isRequired,
    coverImage: PropTypes.object,
    slug: PropTypes.string,
    name: PropTypes.string,
    fullAddress: PropTypes.string,
    tags: PropTypes.array,
    description: PropTypes.string,
    reviewInfo: PropTypes.object,
    suburb: PropTypes.object,
};

export default withStyles(styles)(VenueCard);
