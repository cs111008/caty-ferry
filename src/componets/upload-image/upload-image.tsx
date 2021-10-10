import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Input = styled('input')({
  display: 'none',
});

const UploadImage = (props:{upload: React.ChangeEventHandler}) => {
  
  return (
    <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={props.upload} />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
  );
}

export default UploadImage;