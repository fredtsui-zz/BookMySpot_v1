import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import AddInviteesDialog from './popups/AddInvitees';
import CreateEventsDialog from './popups/CreateEvents';
import AddRequirementsDialog from './popups/AddRequirements';
import AddOptionOfferDialog from './popups/AddOptionOffer';

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState('');
    const [subID, setSubID] = React.useState(null);
    const handleCloseAction = () => {
      setAnchorEl(null);
    }
    const handleOpenAction = (id) => (event) => {
      setSubID(id);
      setAnchorEl(event.currentTarget);
    }
    const handleClosePopup = () => {
      setOpen('');
    }
    const handleOpenPopup = (name) => () => {
      setOpen(name);
    } 
    // data are list of objects, we can just extract the column names out
    let colnames = [];
    if(data && data[0]){
        colnames = Object.keys(data[0]);
    }
    const classes = useStyles();
    const needActionButton = 
            colnames.includes('EventID') || 
            colnames.includes('LocationID') || 
            colnames.includes('SupplierID');
    let actionPopup;
    if(colnames.includes('EventID')) {
      actionPopup = (
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseAction}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
          <Button onClick={handleOpenPopup('add invitee')}>Invite People</Button>
          <Button onClick={handleOpenPopup('add requirement')}>Add Requirements</Button>
      </Popover>)
    } else if (colnames.includes('LocationName')) {
      actionPopup = (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseAction}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
            <Button onClick={handleOpenPopup('add event')}>Create Event</Button>
        </Popover>)
    } else if (colnames.includes('SupplierName')) {
      actionPopup = (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseAction}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
            <Button onClick={handleOpenPopup('add option offer')}>Add Option Offer</Button>
        </Popover>)
    }
  
    return (
      <div>
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
                {actionPopup? <TableCell></TableCell>: null}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row, i) => {
                let id;
                if(colnames.includes('EventID')){
                  id = row.EventID;
                } else if (colnames.includes('LocationName')) {
                  id = row.LocationName;
                } else if (colnames.includes('SupplierName')) {
                  id = row.SupplierName;
                }
                return (
              <TableRow key={i} >
                {colnames && colnames.map((col, index) => {
                    if(index == 0) {
                        return (<TableCell >{row[col]}</TableCell>)
                    } else {
                        return  (<TableCell align="right">{row[col]}</TableCell>)
                    }
                })}
                {actionPopup? <TableCell>
                  <Button onClick={handleOpenAction(id)}>
                    +
                  </Button>
                  {actionPopup}
                </TableCell>: null}
              </TableRow>
            ) })}
          </TableBody>
        </Table>
      </Paper>
      <AddInviteesDialog
        open={open == "add invitee"} 
        subID={subID}
        handleClose={handleClosePopup}
        title="Add Invitees" />
      <AddRequirementsDialog
        open={open == "add requirement"} 
        subID={subID}
        handleClose={handleClosePopup}
        title="Add Requirements" />
      <CreateEventsDialog
        open={open == "add event"} 
        subID={subID}
        handleClose={handleClosePopup}
        title="Create Events" />
      <AddOptionOfferDialog
        open={open == "add option offer"} 
        handleClose={handleClosePopup} 
        subID={subID} 
        title="Add Option Offer"/>
      </div>
    );
  }