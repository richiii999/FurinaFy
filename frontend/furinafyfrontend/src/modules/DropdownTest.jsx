function DropdownTest(){

    return( 
        <div class="songCard">
            <button class="songButton">Add to Playlist</button>
            <div class="dropdown-content">
                <div>
                    <input type="checkbox" id="playcheck1" name="playcheck1" value="playcheck1"></input>
                    <label for="playcheck1"> Add to Playlist 1</label>
                </div>
                <div>
                    <input type="checkbox" id="playcheck2" name="playcheck2" value="playcheck2"></input>
                    <label for="playcheck2"> Add to Playlist 2</label>
                </div>
                <div>
                    <input type="checkbox" id="playcheck3" name="playcheck3" value="playcheck3"></input>
                    <label for="playcheck3"> Add to Playlist 3</label>
                </div>
            </div>
        </div> 
);}

export default DropdownTest