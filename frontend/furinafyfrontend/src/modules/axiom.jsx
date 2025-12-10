import axios from "axios";

export async function getAllSongs() {
  //this function just connects to the DB and retrieves all the songs 
  const res = await axios.get("http://localhost:3000/songs");
  return res.data; 
}
