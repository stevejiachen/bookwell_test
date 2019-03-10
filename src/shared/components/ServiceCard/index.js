import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import massage from '../../assets/massage.png';
import hairdressing from '../../assets/hairdressing.png';
import waxingHairRemoval from '../../assets/waxing-hair-removal.png';
import alternativeTherapy from '../../assets/alternative_therapy.png';
import tanning from '../../assets/tanning.png';
import fitness from '../../assets/fitness.png';
import body from '../../assets/body.png';
import face from '../../assets/face.png';
import eye from '../../assets/eye.png';
import piercing from '../../assets/piercing.png';
import nails from '../../assets/nails.png';

const styles = (theme) => ({
    card: {
        width: '100%',
        height: '100%',
    },
    media: {
        height: 250,
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

function ServiceCard(props) {
    const { classes, name, slug, id } = props;
    const imageMapping = {
        massage: massage,
        hairdressing: hairdressing,
        tanning: tanning,
        'waxing-hair-removal': waxingHairRemoval,
        face: face,
        body: body,
        fitness: fitness,
        eye: eye,
        piercing: piercing,
        nails: nails,
        'alternative-therapy': alternativeTherapy,
    };

    return (
        <Link to={`/venues/${slug}`} key={id} style={{ textDecoration: 'none', color: '#000' }}>
            <div>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={imageMapping[slug]}
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                </Card>
                <div style={{ margin: '10px 0' }}>{name}</div>
            </div>
        </Link>
    );
}

ServiceCard.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.string,
};

export default withStyles(styles)(ServiceCard);
