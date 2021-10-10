import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import { UploadImage } from '../componets/index';
import {createRequestPayload} from '../factories/fetch.factories';
import {HTTP_METHODS} from '../enums/http-methods.enum'
import API_ENDPOINT_CONSTANTS from '../constants/api-endpoint.constants';
import {APP_CONSTANTS} from '../constants/app.constants';

const Upload = () => {
    const [currentFile, setCurrentFile] = useState({ name: '' });
    const [previewImage, setPreviewImage] = useState('');
    const [file, setFile] = useState();

    const uploadImage = (event: any) => {
        setFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setCurrentFile(event.target.files[0]);
    }
    const handleUpload = async () => {

        const formData = new FormData();
        formData.append('file', file!);

        const uploadImageFetchRequestArgs = createRequestPayload(
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
                
            // } else {
            //     setUploading(false);
            //     setRedirectToHome(<Redirect to="/" />);
            }
        } catch (err) {
            console.error(`There is an error occurred while uploading the image. Please try again. ${err || ''}`);
            
        }
    };
    console.log('currentFile ===>', currentFile);
    return (
        <Container>
            <h1> Upload Card</h1>
            <p>{currentFile.name}</p>
            {(previewImage && <Card>
                <CardMedia
                    component="img"
                    height="600px"
                    width="600px"
                    image={previewImage}
                    alt={currentFile.name}
                />
            </Card>)}

            <UploadImage upload={(event: any) => uploadImage(event)} />
            <Button variant="contained" sx={{ color: '#FFF' }} onClick={handleUpload} size="small">Send</Button>
        </Container>
    );
}

export default Upload;