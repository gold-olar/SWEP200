const Material = require('../models/Material');


const upload = async (req, res) => {
  if (!req.files) {
      res.render("lecturerUpload", {
          message: 'Please select a file to upload.'
      })
  }
    try {
          const {path, originalname } = req.files[0];
          const {level } = req.body;
          const {user} = req.cookies;
          console.log(path, originalname);

        const materialParams = { name:originalname, path, level, owner:user.username,};
        const newMaterial = new Material(materialParams);

        let savedMaterial = await newMaterial.save();


        res.render('lecturerUpload', {
            message: "Uploaded Succesfully"
        })
    } catch (error) {
      console.log(error);
        return res.render('error', {
            message: 'Upload has failed.'

        })
    }
}

module.exports = {
    upload,

}
