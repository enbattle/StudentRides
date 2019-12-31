import axios from 'axios'
import { storage } from '../../firebase-config';

const API_URL = 'http://localhost:8080';

const uploadImage = async(e, method) => {
  let imageObj = {};
  console.log(e);
  if (method === "firebase") {
    let currentImageName = "firebase-image-" + Date.now();
    console.log("storage: ", storage);
    let uploadImage = storage.ref(`images/${currentImageName}`).put(e.current.files[0]);
    return new Promise(resolve => {uploadImage.on('state_changed',
      async (snapshot) => { },
      async (error) => {
        alert(error);
      },
      async () => {
        var url = await storage.ref('images').child(currentImageName).getDownloadURL().then(async (url) => {
          // store image object in the database
          imageObj = {
            imageName: currentImageName,
            imageData: url
          };
          await axios.post(`${API_URL}/image/uploadbase`, imageObj)
            .then((data) => {
              if (data.data.success) {
                alert("Image has been successfully uploaded using firebase storage");
              }
            })
            .catch((err) => {
              alert("Error while uploading image using firebase storage")
          });
          resolve(url);
        })
      })
    })
  }
}

export { uploadImage }
