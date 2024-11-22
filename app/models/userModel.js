const { usersRef } = require("../config/firestore");
const { generateId, hashPassword } = require("../utils/commonHelper");

const create = async ({ email, password, name, picture }) => {
  // Ade
  try {
    const newUser = {
      id: generateId(),
      email,
      password: await hashPassword(password),
      name,
      picture: picture || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userCreated = await usersRef.add(newUser);
    return userCreated.id;
  } catch (err) {
    console.error("Error creating user:", err);

    return false;
  }
};

const findEmail = async (email) => {
  // Zacky
  // TODO: Cari email di database
  // input: email
  // output: Jika ada kembalikan true, jika tidak kembalikan false

	try {
        const snapshot = await usersRef.where("email", "==", email).get();

        if (!snapshot.empty) {
            return true; 
        }

        return false; 
    } catch (err) {
        console.error("Error finding email:", err);

	return false;
	}
};

const findByEmail = async (email) => {
  // Thessa
  // TODO: Cari data berdasarkan email di database
  // input: email
  // output: Jika ada kembalikan data, jika tidak kembalikan false
  try {
    const querySnapshot = await usersRef.where("email", "==", email).get();

    if (querySnapshot.empty) {
      return false;
    }

    const userData = querySnapshot.docs[0].data();
    userData.id = querySnapshot.docs[0].id;
    return userData;
  } catch (err) {
    console.error("Error finding user by email:", err);
    return false;
  }
};

const findOne = async (id) => {
  // Iskandar
  // TODO: Cari data berdasarkan id di database
  // input: id
  // output: Jika ada kembalikan data, jika tidak kembalikan false

  return false;
};

const patchOne = async (id) => {
  // Thessa
  // TODO: Update data user di database berdasarkan id
  // input: id
  // output: Jika berhasil kembalikan data, jika gagal kembalikan false
  try {
    const userDoc = usersRef.doc(id);

    const docSnapshot = await userDoc.get();
    if (!docSnapshot.exists) {
      return false;
    }

    updateData.updatedAt = new Date();

    await userDoc.update(updateData);

    const updatedDoc = await userDoc.get();
    const updatedData = updatedDoc.data();
    updatedData.id = updatedDoc.id;
    return updatedData;
  } catch (err) {
    console.error("Error updating user:", err);
    return false;
  }
};

const deleteOne = async (id) => {
  // Zacky
  // TODO: Hapus data user di database berdasarkan id
  // input: id
  // output: Jika berhasil kembalikan true, jika gagal kembalikan false

	try {
        const userDoc = await usersRef.doc(id).get();

        if (!userDoc.exists) {
            console.log(`User with id ${id} does not exist.`);
            return false; 
        }

        await usersRef.doc(id).delete();
        console.log(`User with id ${id} deleted successfully.`);
        return true; 	
    } catch (err) {
        console.error("Error deleting user:", err);
        return false; 
    }
};

const signin = async (email, password) => {
  // Iskandar
  // TODO: Cari dan verifikasi email dan password di database
  // input: email, password
  // output: Jika valid kembalikan true, jika tidak kembalikan false

  return true;
};

module.exports = {
  findEmail,
  findByEmail,
  findOne,
  patchOne,
  deleteOne,
  create,
  signin,
};
