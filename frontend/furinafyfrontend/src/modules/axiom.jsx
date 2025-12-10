import axios from "axios";

export async function getAllSongs() {
  const res = await axios.get("http://localhost:3000/songs");
  return res.data;
}
