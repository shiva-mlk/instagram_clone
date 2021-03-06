 import { Button } from '@material-ui/core'
import React,{useState} from 'react'
 
 function ImageUpload() {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    const [progress, setProgress] = useState(0)

    const handleChange = (e) =>{
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUploaded =() =>{

    }

     return (
         <div>
             <input type="text" placeholder='Enter a caption ' onChange={event => setCaption(event.target.value)} />
             <input type="file" onChange={handleChange} />
             <Button onClick={handleUploaded}>
                 Upload
             </Button>
         </div>
     )
 }
 
 export default ImageUpload
 