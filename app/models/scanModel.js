const getHistories = async (userId) => {
  // Thessa
  // TODO: Ambil data scan dari database berdasarkan user id
  // input: user id
  // output: Jika ada kembalikan data, jika tidak kembalikan false
  try {
    if (!userId) {
      console.error("User ID is required.");
      return false;
    }

    const querySnapshot = await usersRef
      .doc(userId)
      .collection("scans")
      .orderBy("createdAt", "desc")
      .get();

    if (querySnapshot.empty) {
      return false;
    }

    const histories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return histories;
  } catch (err) {
    console.error("Error fetching scan histories:", err);
    return false;
  }
};

const postScan = async (userId, image) => {
  // Ade
  // TODO: Olah gambar ke service ai, lalu simpan hasil dan input ke database, simpan gambar ke storage
  // input: user id, image
  // output: Jika berhasil kembalikan result dari hasil pengolahan ai, jika gagal kembalikan false

  return {};
};

module.exports = { getHistories, postScan };
