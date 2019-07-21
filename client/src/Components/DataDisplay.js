import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  }));
  

  
export default function DataDisplay(props) {
    const {data} = props;    
    // data are list of objects, we can just extract the column names out
    let colnames = [];
    if(data && data[0]){
        console.log(data[0]);
        colnames = Object.keys(data[0]);
    }
    const classes = useStyles();
  
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
                {colnames && colnames.map((name, index) => {
                    if(index == 0){
                        return (<TableCell >{name} </TableCell>);
                    } else {
                        return (<TableCell align="right">{name} </TableCell>);
                    }
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row, i) => {
                //console.log(row);
                return (
              <TableRow key={i}>
                {colnames && colnames.map((col, index) => {
                    console.log(col);
                    console.log(index);
                    console.log(row[col]);
                    if(index == 0) {
                        return (<TableCell >{row[col]}</TableCell>)
                    } else {
                        return  (<TableCell align="right">{row[col]}</TableCell>)
                    }
                })}
              </TableRow>
            ) })}
          </TableBody>
        </Table>
      </Paper>
    );
  }