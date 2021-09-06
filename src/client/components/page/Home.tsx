import { Grid } from '@material-ui/core';
import React from 'react';
import Thumbnail from '../common/Thumbnail';

const Home: React.FC<{}> = () => {
    return (
        <Grid container spacing={1}>
            {['movie1', 'movie2', 'movie3', 'movie4', 'movie5', 'movie6', 'movie7', 'movie8'].map((path) => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={path}>
                        <Thumbnail moviePath={path} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Home;
