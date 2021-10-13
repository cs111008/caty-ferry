import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';

const Input = styled('input')({
  display: 'none',
});

const renderSelectFile = (selectFile: React.ChangeEventHandler) => {
  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={selectFile} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            minHeight: '350px',
            border: '1px dashed #666666',
            background: '#FAFAFA'
          },
        }}
      >
        <Paper elevation={2} >
          <Typography color="text.secondary" align="center" sx={{ mt: '8.5em' }}>
            <AddIcon />
          </Typography>
          <Typography color="text.secondary" align="center">
            Upload
          </Typography>
        </Paper>
      </Box>
    </label>
  )
}

const renderSelectedFile = (file: any, uploading: boolean, handleUpload: React.MouseEventHandler) => {

  return (
    <Card>
      <CardMedia
        component="img"
        width="100%"
        image={URL.createObjectURL(file)}
        alt={file.name}
      />
      <CardActions>
        <Typography color="text.secondary" variant='body2' noWrap>
          {file.name}
        </Typography>
        <LoadingButton
          onClick={handleUpload}
          endIcon={<FileUploadOutlinedIcon />}
          loading={uploading}
          loadingPosition="end"
          variant="outlined"
          sx={{ ml: 'auto' }}
        >
          Upload
        </LoadingButton>
      </CardActions>
    </Card>
  )
}

const UploadImage = (props: { uploading: boolean, selectFile: React.ChangeEventHandler, file: any, handleUpload: React.MouseEventHandler }) => {
  const { file, uploading, selectFile, handleUpload } = props;
  return (
    file ? renderSelectedFile(file, uploading, handleUpload) : renderSelectFile(selectFile)
  );
}

export default UploadImage;