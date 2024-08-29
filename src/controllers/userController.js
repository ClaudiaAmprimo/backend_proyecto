import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
//https://www.bezkoder.com/node-js-express-file-upload/


export const getUser = async (req, res) => {
  try {

    const user_data = {
      "id_user": req.user.id_user,
      "email": req.user.email,
      "name": req.user.name,
      "surname": req.user.surname,
      "photo": req.user.photo,
      "roles": req.user.roles,
      "created_at": req.user.created_at,
      "updated_at": req.user.updated_at
    };

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'User Detail',
      data: user_data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while obtaining the USER'
    });
  }
};

export const uploadPhoto = async (req, res) => {
  try {
    const rutaArchivo = "./src/uploads/"; // Ruta completa al archivo que deseas eliminar
    //await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).json({
        code: -101,
        message: 'Please upload a file!'
      });
    }

    //Si el usuario tiene foto, se la eliminamos
    if (req.user.photo != null) {
      console.log("Ruta:" + rutaArchivo + req.user.photo);
      fs.access(rutaArchivo + req.user.photo, fs.constants.F_OK, (err) => {
        if (err) {
          console.log('The file does not exist or cannot be accessed');
          /*res.status(400).json({
            code: -102,
            message: 'The file does not exist or cannot be accessed',
            error: err
          });*/
        } else {
          // Eliminar el archivo
          fs.unlink(rutaArchivo + req.user.photo, (err) => {
            if (err) {
              console.error('Error al eliminar el archivo', err);
              return res.status(500).json({
                code: -103,
                message: 'Error deleting file',
                error: err
              });
            }
            console.log('El archivo ha sido eliminado correctamente.');
          });
        }

      });
    } else console.log("El usuario no tiene foto, la seteo en la DB");

  const resizedFileName = `resized-${req.file.filename}`;
  await sharp(req.file.path)
    .resize(100, 100)
    .toFile(`${rutaArchivo}${resizedFileName}`);

  console.log("Guardo la imagen: " + resizedFileName + " en el id de usuario: " + req.user.id_user);
  await User.update({ photo: resizedFileName }, { where: { id_user: req.user.id_user } });

  return res.status(200).json({
    code: 1,
    message: "Uploaded and resized the file successfully: " + req.file.originalname,
  });

} catch (err) {
  //** Manejar errores de límite de tamaño o cualquier otro error
  if (err.code == "LIMIT_FILE_SIZE") {
    return res.status(500).send({
      message: "File size cannot be larger than 2MB!",
    });
  }

  res.status(500).send({
    message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    error: `${err}`
  });
}
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, surname } = req.body;
    const userId = req.user.id_user;

    let photo = req.user.photo;
    const rutaArchivo = "./src/uploads/";

    if (req.file) {
      const newFileName = req.file.filename;
      const resizedFileName = `resized-${newFileName}`;

      if (photo && fs.existsSync(path.join(rutaArchivo, photo))) {
        try {
          fs.unlinkSync(path.join(rutaArchivo, photo));
        } catch (error) {
          console.error('Error al eliminar la foto existente:', error);
        }
      }

      await sharp(req.file.path)
        .resize(100, 100)
        .toFile(path.join(rutaArchivo, resizedFileName));

      fs.renameSync(path.join(rutaArchivo, resizedFileName), path.join(rutaArchivo, newFileName));

      photo = newFileName;
    }

    await User.update(
      { name, surname, photo },
      { where: { id_user: userId } }
    );

    const updatedUser = await User.findByPk(userId);
    res.status(200).json({
      code: 1,
      message: 'Profile updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({
      code: -200,
      message: 'An error occurred while updating the profile',
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const user = await User.findByPk(userId);

    if (user && user.photo) {
      const photoPath = path.join("./src/uploads/", user.photo);

      if (user.photo !== 'Profile_avatar_placeholder.png' && fs.existsSync(photoPath)) {
        try {
          fs.unlinkSync(photoPath);
          console.log('Foto del usuario eliminada correctamente:', user.photo);
        } catch (error) {
          console.error('Error al eliminar la foto del usuario:', error);
        }
      } else {
        console.log('No se elimina el placeholder o la foto no existe:', user.photo);
      }
    }

    await User.destroy({ where: { id_user: userId } });

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({
      message: 'Error al eliminar el usuario',
      error: error.message
    });
  }
};
