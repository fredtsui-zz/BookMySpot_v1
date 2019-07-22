import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function CreateEventsDialog(props) {
    const {open, handleClose, title, subID} = props;
    const [query, setQuery] = React.useState({
        LocationName: subID
    });

    const handleSubmit = async () => {
        console.log(query);
        if(query.ClientName) {
            console.log('calling insertNewEvent');
            const response = await fetch('/api/insertNewEvent', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(query),
              });
            const data = await response.text();
            if(data){
                console.log('succeeded', data);
            } else {
                console.log('failed');
            }
        } else {
            alert('Error: no name as input');
        }
        handleClose();
    }

    const handleChange = (name, i) => (event) => {
        
        setQuery({ ...query, [name]: event.target.value});
        
    }
    // todo: add time-choosing input

    return (
        <Dialog  fullWidth open={open} onClose={handleClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>Client ID</DialogContentText>
                <TextField onChange={handleChange('ClientID')}/>
                {subID? null: 
                <DialogContentText>Location Name</DialogContentText>}
                {subID? null:
                <TextField onChange={handleChange('LocationName')}/>}
                <DialogContentText>Event Type</DialogContentText>
                <TextField onChange={handleChange('Type')}/>
                <DialogContentText>Start Time</DialogContentText>
                <TextField onChange={handleChange('StartTime')}/>
                <DialogContentText>End Time</DialogContentText>
                <TextField onChange={handleChange('EndTime')}/>
                <DialogContentText>Budget</DialogContentText>
                <TextField onChange={handleChange('Budget')}/>
                <DialogContentText>Total People</DialogContentText>
                <TextField onChange={handleChange('NumberOfInvites')}/>
                
            
            </DialogContent>

            <DialogActions>
                
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Insert
                </Button>
            </DialogActions>
        </Dialog>
    )
}