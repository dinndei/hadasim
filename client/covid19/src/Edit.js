import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Grid, Container } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { updateClient } from "./clientApi";
import { useSelector,useDispatch } from "react-redux";
import { resetPerson } from "./personSlice";

const verticalTypographyStyle = {
  writingMode: 'vertical-lr', // vertical writing mode from left to right
  textOrientation: 'mixed', // allows vertical text to be readable from top to bottom
  whiteSpace: 'nowrap', // prevents text from wrapping

};
// const allowedProducers = ['Pfizer-BioNTech', 'Moderna', 'Novavax'];

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    // idNumber: Joi.string().required().min(9).max(9), // Assuming ID number should have 9 characters
    address: Joi.object().keys(
        {
            city: Joi.string().required(),
            road: Joi.string().required(),
            number: Joi.number().required()
        }
    ).required(),
    // birthDate: Joi.date().iso(),
    phone: Joi.string().required(),
    selfPhone: Joi.string(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    // positivRes: Joi.date().iso(),
    // recovery: Joi.date().iso(),
    // vaccinations: Joi.array().items(Joi.object({
    //     date: Joi.date().iso(),
    //     producer: Joi.string().valid(...allowedProducers)
    // }))
});
const Edit = () => {
    
    const dispatch=useDispatch();
    const [person, setPerson] = useState(useSelector(st=>st.person.person));
    console.log(person);
    const { handleSubmit, control, formState } = useForm({
        resolver: joiResolver(schema),
        mode: "onChange",
        defaultValues: {
            firstName: person.firstName || ' ',
            lastName: person.lastName || ' ',
            address:{
            city: person.address.city || ' ',
            road: person.address.road || ' ',
            number: person.address.number || ' '},
            phone: person.phone || ' ',
            selfPhone: person.selfPhone || ' ',
            email: person.email || ' ',
           
        }
    });

    const onSubmit = async (data) => {
        try {
            
            let res = await updateClient(person._id,data);
            console.log(res);
            dispatch(resetPerson())
            window.location.href = "/";
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "oops!",
                text: error.request?.statusText||error.message,

            });
            console.error(error)

        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">
                            Edit Person details
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="First name"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Last name"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>  <Grid item xs={12}>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Phone number"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>  <Grid item xs={12}>
                        <Controller
                            name="selfPhone"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Self phone"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>  <Grid item xs={12}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Controller
                            name="address.city"
                            control={control}
                            
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="City"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Controller
                            name="address.road"
                            control={control}
                          
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Road"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                    <Typography style={verticalTypographyStyle}>Address</Typography>
</Grid>
                    <Grid item xs={10}>
                        <Controller
                            name="address.number"
                            control={control}
                         
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Number"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
            
                    </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            disabled={!formState.isValid}
                            fullWidth
                        >

                            Save and return

                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>

    );
}

export default Edit;