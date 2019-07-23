import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function AddLocationsDialog(props) {
    const {open, handleClose, title, updateData} = props;
    const [query, setQuery] = React.useState({});
    const handleSubmit = async () => {
        console.log(query);
        if(query.LocationID) {
            console.log('calling insertLocation');
            const response = await fetch('/api/insertLocation', {
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
        }// then retrieve all the clients back
        const response = await fetch('/api/getAllLocation');
        const data = await response.json();
        updateData(data[0]);
        handleClose();
    }

    const handleChange = (name) => (event) => {
        setQuery({ ...query, [name]: event.target.value});
    }

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>LocationName *</DialogContentText>
                <TextField onChange={handleChange('LocationID')}/>
                <DialogContentText>Capability</DialogContentText>
                <TextField onChange={handleChange('Capability')}/>
                <DialogContentText>Phone</DialogContentText>
                <TextField onChange={handleChange('Phone')}/>
                <DialogContentText>Hours</DialogContentText>
                <TextField onChange={handleChange('Hours')}/>
                <DialogContentText>Address</DialogContentText>
                <TextField onChange={handleChange('Address')}/>
                <DialogContentText>City</DialogContentText>
                <TextField onChange={handleChange('City')}/>
                <DialogContentText>Province</DialogContentText>
                <TextField onChange={handleChange('Province')}/>
            
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )

}