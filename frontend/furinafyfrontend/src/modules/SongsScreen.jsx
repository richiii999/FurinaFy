import SongCard from "./SongCard";
<<<<<<< HEAD

function SongsScreen({ onClick }){
    return (
   
   /*temporary rn replaces these with song cards****/
   <div className="songScreen">
=======
function SongsScreen({ onClick }){
    return (
    /*temporary rn replaces these with song cards****/
    <div>
>>>>>>> origin/main
    <button onClick={onClick}><SongCard/></button>
    <button onClick={onClick}><SongCard/></button>
    <button onClick={onClick}><SongCard/></button>
    <button onClick={onClick}><SongCard/></button>
    <button onClick={onClick}><SongCard/></button>
<<<<<<< HEAD
        <button onClick={onClick}>+</button>
=======
    <button onClick={onClick}>+</button>    
    <button onClick={onClick}>Songs</button>
>>>>>>> origin/main
    </div>
    );
};

export default SongsScreen