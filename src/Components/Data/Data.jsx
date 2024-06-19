import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
function NewData() {
    const [data,setData] = useState([]);

    useEffect(()=>{
       const getdata = async () =>{
        const response = await axios.get('http://localhost:3000/data') 
        console.log(response.data);
        setData(response.data)
        console.log(data)
       }
getdata();
    },[])


    return(
        <>
        <div>
            {
                data.map((item)=>(
                    <>
                    <div>
                    <Link to={`/Single/${item.id}`}>
                        <h1>{item.name}</h1>
                        </Link>
                        <audio controls src={item.song}>
                        </audio>
                        
                    </div>
                    </>
                ))
            }
        </div>
        </>
    )
}

export default NewData;