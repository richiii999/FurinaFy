import SongCard from "./SongCard"; /*temp*/
function PlaylistScreen({ onClick }){
    return (
    <div>
        <button onClick={onClick}><SongCard/></button>
        <button onClick={onClick}>+</button>   
    </div>
    );
}
export default PlaylistScreen