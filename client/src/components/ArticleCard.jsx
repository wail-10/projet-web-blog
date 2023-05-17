import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';

function ArticleCard(props) {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardMedia
                    className='h-[300px]'
                    component="img"
                    image={props.image}
                    alt="green iguana"
                />
                <CardContent sx={{ minHeight: 150 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.titre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.contenu.slice(0, 50)}...
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
            </CardActions>
        </Card>
    )
}

export default ArticleCard