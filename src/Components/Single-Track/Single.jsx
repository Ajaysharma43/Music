import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useParams} from "react-router-dom";

function Single() {
    
    const [single,setSingle] = useState([]);
    const [isplaying,setisplaying] = useState(true)
    const [audioState,setaudioState] = useState("pause");
    const [progress,setProgress] = useState(0);

    const {id} = useParams();
    const [newid,setid] = useState(id)
    
    const audiocontrol = useRef(null)
    const audiorange = useRef(null)
    const NextSong = useRef(null)
    const PrevSong = useRef(null)


    useEffect(()=>{
        const GetSingle = async () => {
            console.log(id);
            const response = await axios.get(`http://localhost:3000/data/${newid}`)
            audiocontrol.current.play();
            console.log(response.data);
            setSingle(response.data)
            console.log(single);
        }
        GetSingle();
    },[])

    
    
    async function Next(id)
    {
        console.log(id);
        id = id + 1;
        window.location.replace(`http://localhost:5173/Single/${id}`)
    }
    
    async function Prev(id)
    {
        console.log(id);
        id = id - 1;
        window.location.replace(`http://localhost:5173/Single/${id}`)
    }

    function audioOperation(){
        const audio = audiocontrol;
        if(isplaying == false)
        {
            audio.current.play();
            setisplaying(true)
            setaudioState("pause")
        }
        if (isplaying == true) {
            audio.current.pause()
            setisplaying(false)
            setaudioState("play")
        }
    }


    function updatedProgerss(value){
                const currenttime = audiocontrol.current.currentTime
                const duration = audiocontrol.current.duration
                setProgress((currenttime/duration) * 100)  
    }

    


    useEffect(()=>{
        const currentaudio = audiocontrol.current;
       currentaudio.addEventListener('timeupdate',updatedProgerss)
       
    },[])

    

    return(
    <>
<div className="page">
    <h1>{single.name}</h1>                  
    <audio id="myAudio" controls src={single.song}ref={audiocontrol} hidden>
    </audio>
    <input type="range" value={progress} ref={audiorange} onch onChange={(e)=>updatedProgerss(e.target.value)}/>
    <button onClick={audioOperation}>{audioState}</button>

    <button ref={PrevSong} onClick={()=>Prev(single.id)}>PrevSong</button>
    <button ref={NextSong} onClick={()=>Next(single.id)}>Nextsong</button>
        
</div>
    </>
    )
}


export default Single;