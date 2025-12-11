import axios from "axios";

export async function getAllSongs() {
  //this function just connects to the DB and retrieves all the songs 
  const res = await axios.get("http://localhost:3000/songs");
  return res.data; 
}

export async function uploadSong(newSong) {
  try {
    const res = await axios.post(
      "http://localhost:3000/song",
      newSong,
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    return res.data; // return created song from server

  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
}

//delete song from DB
export async function deleteSongFromDB(id) {
  try {
    const res = await axios.delete(`http://localhost:3000/song/${id}`);
    return res.data;
  } catch (err) {
    console.error("Axios delete error:", err);
    throw new Error("Failed to delete song");
  }
}
