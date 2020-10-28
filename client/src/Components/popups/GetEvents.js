import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

export default function GetEventsDialog(props) {
    const {open, handleClose, title, updateData} = props;
    const [query, setQuery] = React.useState({});
    const [past, setPast] = React.useState(false);
    const [future, setFuture] = React.useState(false);
    const [overBill, setOverBill] = React.useState(false);
    const handleSubmit = async () => {
        let url = '/api/';
        if(query.ClientID) {
            url += 'getAllEventsFromClient/' + query.ClientID;
        } else if (future){
            url += 'getAllEventsInFuture/';
        } else if (past) {
            url += 'getAllEventsInPast/';
        } else if (overBill) {
            url += 'getAllBudgetOverBill/';
        } else {
            url += 'getAllEvents/';
        }
        const response = await fetch(url);
        const data = await response.json();
        if(!data){
            console.log('no data returned, something wrong might happened at server');
        }
        updateData(data[0]);
        handleClose();
    }

    const handleChange = (name) => (event) => {
        if(name === 'future') {
            setFuture(!future);
            setPast(false);
            setOverBill(false);
        } else if (name === 'past') {
            setPast(!past);
            setFuture(false);
            setOverBill(false);
        } else if (name === 'overBill') {
            setOverBill(!overBill);
            setPast(false);
            setFuture(false);
        } else {
            setQuery({ ...query, [name]: event.target.value});
        }
    }

    return (
        <Dialog fullWidth open={open} onClose={handleClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>Client ID</DialogContentText>
                <TextField onChange={handleChange('ClientID')}/>
                <DialogContentText>Future Events</DialogContentText>
                <Checkbox checked={future} onChange={handleChange('future')} value={future}/>
                <DialogContentText>Past Events</DialogContentText>
                <Checkbox checked={past} onChange={handleChange('past')} value={future}/>
                <DialogContentText>Budget-Over-Bill Events</DialogContentText>
                <Checkbox checked={overBill} onChange={handleChange('overBill')} value={future}/>
                
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Query
                </Button>
            </DialogActions>
        </Dialog>
    )
}