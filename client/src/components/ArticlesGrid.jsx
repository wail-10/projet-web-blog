import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArticleCard from './ArticleCard';
import Typography from '@mui/material/Typography';

function ArticlesGrid() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/articles')
        .then(res => setArticles(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <Box sx={{ width: '75%' }} className='absolute top-[80px] left-[320px]'>
            <Typography variant="h2" component="h2">
                Articles
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {articles.map((article) => (
                    <Grid item xs={6} key={article.id}>
                        <ArticleCard 
                            image={article.image} 
                            titre={article.titre} 
                            //contenu={article.contenu} 
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ArticlesGrid