import express from "express";

//this contains the packages used for retrival of images
import { storage } from '../database/db.js';
import { ref, listAll,getDownloadURL } from "firebase/storage";

const router=express.Router();

// API for getting images
router.get('/getSignWord/:word', (req, resp) => {

    const word = req.params.word;
    
    // Create a reference under which you want to list
    const starsRef = ref(storage, `ASL_images/${word}.png`);

    
    // Get the download URL
    getDownloadURL(starsRef)
    .then((url) => {
        // Insert url into an <img> tag to "download"
        return resp.json({url,"success":true})
    })
    .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
        case 'storage/object-not-found':
            // File doesn't exist
            return resp.status(404).json({"error":"not found","success":false})
            break;
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            return resp.status(500).json({"error":"you dont have permission to access this","success":false})
            break;
        case 'storage/canceled':
            // User canceled the upload
            return resp.status(404).json({"error":"user canceled the upload","success":false})
            break;

        // ...

        case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
    });
})

router.get('/getSignLetter/:letter', (req, resp) => {

    const letter = req.params.letter;
    
    // Create a reference under which you want to list
    const starsRef = ref(storage, `ASL_images/letters/${letter}.png`);

    
    // Get the download URL
    getDownloadURL(starsRef)
    .then((url) => {
        // Insert url into an <img> tag to "download"
        return resp.json({url,"success":true})
    })
    .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
        case 'storage/object-not-found':
            // File doesn't exist
            return resp.status(404).json({"error":"not found","success":false})
            break;
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            return resp.status(500).json({"error":"you dont have permission to access this","success":false})
            break;
        case 'storage/canceled':
            // User canceled the upload
            return resp.status(404).json({"error":"user canceled the upload","success":false})
            break;

        // ...

        case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
    });
})


export default router;