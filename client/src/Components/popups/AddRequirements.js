import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function AddRequirementsDialog(props) {
    const {open, handleClose, title, subID} = props;
    const [query, setQuery] = React.useState({});
    if(!subID) {
        return <Dialog open={open} onClose={handleClose} >
            <DialogContentText>No Offer ID provided</DialogContentText>
        </Dialog>
    }
    const handleSubmit = async () => {
        if(subID) {
            console.log('calling insertNewRequirement');
            let response = await fetch('/api/insertNewRequirement', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({...query, OfferId: subID}),
              });
            let data = await response.text();
            if(!data){
                console.log('failed');
            }
            response = await fetch('/api/updateBill', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(query),
              });
            data = await response.text();
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

    const handleChange = (name) => (event) => {
        setQuery({ ...query, [name]: event.target.value});
    }

    return (
        <Dialog fullWidth open={open} onClose={handleClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>Event ID *</DialogContentText>
                <TextField onChange={handleChange('EventID')}/>
                <DialogContentText>Amount</DialogContentText>
                <TextField onChange={handleChange('Amount')}/>
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