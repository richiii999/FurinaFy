



import { useRef, useState, useEffect} from "react";

/********https://www.youtube.com/watch?v=wxp4R_avfYw** */


import "../styles/MusicPlayer.css"



const MusicPlayer = ({audioSrc, imagine, title}) => {

const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] =useState(0);
const [duration,setDuration] = useState(0);


const audioRef = useRef(null);



/***********updates the time and duration */
const handleSeek = (e) =>{

audioRef.current.currentTime = e.target.value;
setCurrentTime(e.target.value);

};

const handleTimeUpdate = () =>{

setCurrentTime(audioRef.current.currentTime);
setDuration(audioRef.current.duration);

};

/************************************************************************ */

/****************button handlers below here**************************** */
const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
};

const handlePause = () =>{
audioRef.current.pause();
setIsPlaying(false);
}


const handlePlayPause =() => {

if (isPlaying) {
    handlePause();
}
    
else {
  handlePlay();
    }


    
}
/****************************IS WHERE THE GOPREV AND GONEXT BUTTONS FUNCTIONS SHOULD BE *************************************** */

const handlePrev = () => {

   MusicPlayer('../public/hatsune_miku/[60fps Full風] The disappearance of Hatsune Miku -DEAD END-初音ミクの消失 DIVA Dreamy theater English Romaji [5qkTpJAhywg].mp3',"here","../public/furina_sil1.png")
   
   audioRef.current.play();
   setIsPlaying(true);
};



const handleNext = () => {

    /****UPDATE FROM AUDIO REF */
    audioRef.current.play();
    setIsPlaying(true);
};



/********************** */



/********does the duration udpating  */
useEffect(()=>{
   
    audioRef.current.addEventListener("timeupdate",handleTimeUpdate);

    return () =>{
          (audioRef.current)?.removeEventListener("timeupdate",handleTimeUpdate);
    };


}, []

);


const checkifplaying = () =>{

if (isPlaying) {
      return <img src="./pause.png"></img>;
}
    
else {
      return <img src="./play.png"></img>;
    }

}




return(

<div className='helo'> 

<div className="card stuff">

<img src={imagine}/> 
<img src="../public/furina_sil1.png"/> 
<div className="card"> song: {title}</div>

</div>


<input
type="range"
min ="0"
max={duration}
value={currentTime}
onChange={handleSeek}
/>

<audio ref={audioRef} src={audioSrc}></audio>



{/*************the numbers below image */}
<div className='track-duration'>

<p> {currentTime}</p>
<p>{duration}</p>

</div>

{/*******************************GO PREV AND GO NEXT ARE NOT WORKING I PLANNED FOR THEM TO BE RECURSIVE *****/}


<button className="playbutton" onClick={handlePrev}>
    <span> {/***idk what span does it's just there in the totorial */}
        {
       <img src="./prev.png"></img>
        }
    </span>
</button>
<button className="playbutton" onClick={handlePlayPause}>
    <span> {/***idk what span does it's just there in the totorial */}
        {
        checkifplaying()
     
        }
    </span>
</button>
<button className="playbutton" onClick={handleNext}>
    <span> {/***idk what span does it's just there in the totorial */}
     <img src="./next.png"></img>
    </span>
</button>






</div>




)
}



export default MusicPlayer;


