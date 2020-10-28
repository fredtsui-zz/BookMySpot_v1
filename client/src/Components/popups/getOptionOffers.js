import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default function GetOptionOffersDialog(props) {
    const {open, handleClose, title, updateData} = props;
    const [query, setQuery] = React.useState({});
    
    const handleSubmit = async () => {
        let url;
        if(query.SupplierName && query.Type) {
            url = '/api/getTypeMenuFromSupplier/' + query.SupplierName + '/' + query.Type;
        } else if(query.SupplierName) {
            url = '/api/getAllFromSupplier/' + query.SupplierName;
        } else {
            alert('Supplier Name must not be empty');
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
                <DialogContentText>Supplier Name</DialogContentText>
                <TextField onChange={handleChange('SupplierName')}/>
                <DialogContentText>Type</DialogContentText>
                <TextField onChange={handleChange('Type')}/>
            </DialogContent>
        
            <DialogActions>
                <Button onClick={handleClose} color="danger">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Find Offerings
                </Button>
            </DialogActions>
        </Dialog>
    )

}