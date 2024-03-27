import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
    TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
} from '@mui/material';
import { deleteClient, getClients, updateClient } from './clientApi';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  addButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
  formInput: {
    marginBottom: '20px',
  },
});

const PeopleList = () => {
  const classes = useStyles();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [people, setPeople] = useState([]);
  const [inAction, setInAction] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    address: '',
    birthDate: '',
    phone: '',
    selfPhone: '',
    email: '',
    vaccinations: '',
    positiveRes: '',
    recovery: '',
  });
useEffect(()=>{
    getClients()
    .then(res=>setPeople(res.data))
    .catch(err=>console.log(err))
},[])
  const handlePersonClick = (person) => {
        setSelectedPerson(person);
  };

  const handleDialogClose = () => {
    setSelectedPerson(null);
  };

  const handleDeletePerson = (personId) => {
    setInAction(true);
    deleteClient(personId).then(setInAction(false)).catch(err=>console.log(err))
    console.log(`Deleting person with ID: ${personId}`);
  
  };
 

  const handleEditPerson = (person) => {
    setInAction(true);
    setSelectedPerson(person);
    setFormData({ ...person }); // Fill the form data with selected person's details
    setOpenForm(true); // Open the form dialog
    console.log(`Editing person with ID: ${person.idNumber}`);
    

  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDataDialogClose = () => {
    setSelectedPerson(null);
    setOpenForm(false);
    setInAction(false);
    setFormData({
      firstName: '',
      lastName: '',
      idNumber: '',
      address: '',
      birthDate: '',
      phone: '',
      selfPhone: '',
      email: '',
      vaccinations: '',
      positiveRes: '',
      recovery: '',
    });
  };

  const handleSubmit = () => {
    updateClient(selectedPerson._id,formData)
    .then(
        console.log('Form submitted:', formData),
        handleDataDialogClose(),
        setInAction(false)
    ).catch(err=>
        console.log(err)

    )
    
  };
  return (
    <>
       <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="people table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Self Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
         <TableBody>
            {people.map((person) => (
              <TableRow key={person.id} onClick={() => handlePersonClick(person)}>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>{person.phone}</TableCell>
                <TableCell>{person.selfPhone}</TableCell>
                <TableCell>{person.email}</TableCell>                  
                <TableCell>
                  <Button onClick={() => handleEditPerson(person)}>Edit</Button>
                  <Button onClick={() => handleDeletePerson(person.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
 
      <Dialog open={selectedPerson!==null&&!inAction} onClose={handleDialogClose}>
        <DialogTitle>{selectedPerson && `${selectedPerson.firstName} ${selectedPerson.lastName}`}</DialogTitle>
        <DialogContent>
          {selectedPerson && (
            <div>
              <Typography><strong>id:</strong> {selectedPerson.idNumber}</Typography>
              <Typography><strong>birth date:</strong> {selectedPerson.birthDate}</Typography>
              <Typography><strong>Phone:</strong> {selectedPerson.phone}</Typography>
              <Typography><strong>Self Phone:</strong> {selectedPerson.selfPhone}</Typography>
              <Typography><strong>Email:</strong> {selectedPerson.email}</Typography>
              <Typography><strong>Vaccinations:</strong></Typography>
              {selectedPerson.vaccinations&&selectedPerson.vaccinations.map((vaccination, index) => (
                <div key={index}>
                  <Typography>Date: {vaccination.date}, Producer: {vaccination.producer}</Typography>
                </div>
              ))}
              {selectedPerson.positiveRes && (
                <Typography><strong>Positive Result:</strong> {selectedPerson.positiveRes}</Typography>
              )}
              {selectedPerson.recovery && (
                <Typography><strong>Recovery Date:</strong> {selectedPerson.recovery}</Typography>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog> 
      
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        startIcon={<span role="img" aria-label="Add">➕</span>}
        title="Add a client"
        onMouseOver={() => setOpenForm ? '': 'Add a client'}
        onClick={() => setOpenForm(true)}
      >
        Add Client
      </Button>

      <Dialog open={openForm} onClose={handleDialogClose}>
        <DialogTitle>{selectedPerson ? 'Edit Client' : 'Add New Client'}</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formInput}
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          {/* Add other form fields here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDataDialogClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PeopleList;
