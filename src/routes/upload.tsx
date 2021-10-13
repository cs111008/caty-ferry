import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { UploadImage } from '../componets/index';
import { createRequestOptions } from '../factories/fetch.factories';
import { HTTP_METHODS } from '../enums/http-methods.enum'
import API_ENDPOINT_CONSTANTS from '../constants/api-endpoint.constants';

const Upload = () => {
    const [file, setFile] = useState();
    const [uploading, setUploading] = useState(false);

    const uploadImage = (event: any) => {
        setFile(event.target.files[0]);
    }
    const handleUpload = async () => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file!);

        const uploadImageFetchRequestArgs = createRequestOptions(
            HTTP_METHODS.POST,
            `https://api.thecatapi.com${API_ENDPOINT_CONSTANTS.UPLOAD}`,
            {},
            formData
        );

        try {
            const catUploadResult = await fetch(...uploadImageFetchRequestArgs);
            const catUploadJson: any = await catUploadResult.json();
            if (!catUploadResult.ok) {
                console.error(`There is an error occurred while uploading the image. Please try again. ${catUploadJson.message}`);

            } else {
                setUploading(false);
                setFile(undefined);
            }
        } catch (err) {
            console.error(`There is an error occurred while uploading the image. Please try again. ${err || ''}`);

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
        </Grid>
    );
}

export default Upload;