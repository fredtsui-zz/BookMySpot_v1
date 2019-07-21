import React, { Component } from 'react';

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
  
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function TableDisplay(props) {
    const classes = useStyles();
    let data;
    if(props.data){
        data = props.data;
    }
    else {
        data = [
          createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
          createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
          createData('Eclair', 262, 16.0, 24, 6.0),
          createData('Cupcake', 305, 3.7, 67, 4.3),
          createData('Gingerbread', 356, 16.0, 49, 3.9),
        ];
    }
    
    return (
      <div className={classes.root}>
        <DataDisplay data={data} />
      </div>
    );
}