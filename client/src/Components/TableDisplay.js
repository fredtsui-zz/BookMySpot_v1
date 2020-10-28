import React from 'react';

import DataDisplay from './DataDisplay';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '80%',
    float: 'right',
    display: 'block',
    top: 0,
    right: 0,
    paddingTop: '20px',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function TableDisplay(props) {
    const classes = useStyles();
    const updateData = props.updateData;
    let data = [];
    if(props.data){
        data = props.data;
    }
    return (
      <div className={classes.root}>
        <DataDisplay data={data} updateData={updateData}/>
      </div>
    );
}