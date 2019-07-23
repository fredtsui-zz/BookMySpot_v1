import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddSuppliersDialog(props) {
    const {open, handleClose, title, updateData} = props;
    const [query, setQuery] = React.useState({
        isCater: false,
        isFlower: false,
        isEntertainment: false
    });
    const handleSubmit = async () => {
        console.log(query);
        if(query.SupplierName) {
            console.log('calling add suppliers');
            const response = await fetch('/api/insertNewSupplier', {
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
        const response = await fetch('/api/getSuppliers/'+query.isCater+'/'+query.isFlower+'/'+query.isEntertainment);
        const data = await response.json();
        console.log(data);
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
                <DialogContentText>Supplier Name *</DialogContentText>
                <TextField onChange={handleChange('SupplierName')}/>
                <DialogContentText>Catering</DialogContentText>
                <Checkbox checked={query.isCater} onChange={handleChange('isCater')} value={!query.isCater}/>
                <DialogContentText>Flower</DialogContentText>
                <Checkbox checked={query.isFlower} onChange={handleChange('isFlower')} value={!query.isFlower}/>
                <DialogContentText>Entertainment</DialogContentText>
                <Checkbox checked={query.isEntertainment} onChange={handleChange('isEntertainment')} value={!query.isEntertainment}/>
            
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