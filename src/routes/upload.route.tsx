import { useState, ReactElement } from 'react';
import { useSnackbar } from 'notistack';
import { Redirect } from 'react-router';
import Grid from '@mui/material/Grid';
import { UploadImage } from '../componets/index';
import { createRequestOptions } from '../factories/fetch.factories';
import { HTTP_METHODS } from '../enums/http-methods.enum'
import API_ENDPOINT_CONSTANTS from '../constants/api-endpoint.constants';

const Upload = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [file, setFile] = useState();
    const [uploading, setUploading] = useState(false);
    const [redirectRoute, setRedirectRoute] = useState<null | ReactElement>(null);

    const uploadImage = (event: any) => {
        setFile(event.target.files[0]);
    }
    const handleUpload = async () => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file!);

        const uploadCatImageRequestOptions = createRequestOptions(
            `https://api.thecatapi.com${API_ENDPOINT_CONSTANTS.UPLOAD}`,
            HTTP_METHODS.POST,
            {},
            formData
        );

        try {
            const uploadCatResponse = await fetch(...uploadCatImageRequestOptions);
            const uploadCatData: any = await uploadCatResponse.json();
            if (!uploadCatResponse.ok) {
                setUploading(false);
                setFile(undefined);
                enqueueSnackbar(`Cat upload failed : ${uploadCatData.message}`, {variant: 'error'});
            } else {
                setUploading(false);
                setFile(undefined);
                enqueueSnackbar('Cat added successfully', {variant: 'success'});
                setRedirectRoute(<Redirect to="/" />);
                
            }
        } catch (error: any) {
            enqueueSnackbar(`Cat upload unsuccessful : ${error.message}`, {variant: 'error'});
        }
    };

    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '60vh' }}
        >
            <Grid item xs={8} >
                <UploadImage uploading={uploading} selectFile={(event: any) => uploadImage(event)} file={file} handleUpload={handleUpload} />
            </Grid>
            {redirectRoute}
        </Grid>
    );
}

export default Upload;