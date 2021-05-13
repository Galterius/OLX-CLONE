import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useListingStore } from '../../store/ListingContext';
import { createListing } from '../../actions/listing_actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  upload: {
    marginRight: theme.spacing(40),
  },
}));

export const AddFormItem = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const form = useRef(null);
  const history = useHistory();
  const listingStore = useListingStore();

  const [photoName, setPhotoName] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      console.log(`${loaded}b of ${total}b | ${percent}%`);

      if (percent < 100) {
        setUploadPercentage(percent);
      }
    },
  };

  const onSubmit = async () => {
    const formData = new FormData(form.current);
    formData.append('name', props.name);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    const returnedListing = await createListing(formData, options).then((res) => {
      setUploadPercentage(100);
      setTimeout(() => {
        setUploadPercentage(0);
        listingStore.addListings(res);
        history.push(`/listing/${res._id}`);
      }, 1000);
    });
  };

  const uploadedPhotos = (e) => {
    let inpstr = e.target.value;
    let fileName = inpstr.slice(12, inpstr.length).toString();
    console.log(e.target.value);
    setPhotoName([]);
    setPhotoName((prevValue) => [...prevValue, fileName]);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ListAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a new Listing
        </Typography>

        <form
          ref={form}
          encType="multipart/form-data"
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                required
                name="title"
                id="title"
                label="Listing title"
                autoComplete="none"
                autoFocus
              />
            )}
            rules={{ required: 'Sorry but the title is requiered' }}
          />
          <Controller
            name="price"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                required
                fullWidth
                label="Price"
                name="price"
                type="number"
                id="price"
                autoComplete="none"
              />
            )}
            rules={{ required: 'Sorry but the price is requiered' }}
          />
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="pictures"
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              multiple
              {...register('images', { required: true })}
              onChange={uploadedPhotos}
            />
            <Button className="btn-choose" variant="contained" color="secondary" component="span">
              Choose Images
            </Button>
          </label>
          {photoName.length > 0 &&
            photoName?.map((pName, index) => <Typography key={pName.length}> {pName}</Typography>)}
          <LinearProgress variant="determinate" value={uploadPercentage} />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                multiline
                required
                fullWidth
                rows={5}
                id="description"
                name="description"
                label="Description"
                autoComplete="none"
              />
            )}
            rules={{ required: 'Sorry but the description is requiered' }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Add Listing
          </Button>
        </form>
      </div>
    </Container>
  );
};
