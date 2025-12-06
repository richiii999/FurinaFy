function PlaylistScreen({ onClick }){
    return (
    <div className="setting_playlist_buttons">
         <button onClick={onClick}>Songs</button> {/*temporary just adding here to better visualize*/}
        <button onClick={onClick}>Playlists</button>
    </div>
    );
}
export default PlaylistScreen