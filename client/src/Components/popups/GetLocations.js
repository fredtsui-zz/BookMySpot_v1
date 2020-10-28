import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';


export default function GetLocationsDialog(props) {
    const {open, handleClose, title, updateData} = props;
    const [query, setQuery] = React.useState({});
    const findAvailable = () => {
        handleSubmit('findAvailable');
    };
    const handleSubmit = async (param) => {
        let url;
        if(param === 'findAvailable') {
            const cap = query.capability? query.capability: 0;
            url = '/api/getAvailableLocations/' + query.StartTime + '/' + query.EndTime + '/' + cap;
        } else if(query.city && query.province) {
            url = '/api/getLocationInCity/' + query.city + '/' + query.province
        } else if (query.capability && query.price){
            url = '/api/getLocationWithCapabilityAndPrice/' + query.capability + '/' + query.price
        } else {
            url = '/api/getAllLocation/';
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
        setQuery({ ...query, [name]: event.target.value});
    }

    return (
        <Dialog fullWidth open={open} onClose={handleClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>City</DialogContentText>
                <TextField onChange={handleChange('city')}/>
                <DialogContentText>Province</DialogContentText>
                <TextField onChange={handleChange('province')}/>
                <DialogContentText>Price</DialogContentText>
                <TextField onChange={handleChange('price')}/>

                <DialogContentText>Min. Capability</DialogContentText>
                <TextField onChange={handleChange('capability')}/>
                <DialogContentText>Start Time (e.g. 2019-09-01 09:00:00)</DialogContentText>
                <TextField onChange={handleChange('StartTime')}/>
                <DialogContentText>End Time</DialogContentText>
                <TextField onChange={handleChange('EndTime')}/>
            </DialogContent>
        
            <DialogActions>
                <Button onClick={handleClose} color="danger">
                    Cancel
                </Button>
                <Button onClick={findAvailable} color="primary">
                    Find Available Locations
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Find Locations
                </Button>
            </DialogActions>
        </Dialog>
    )

}