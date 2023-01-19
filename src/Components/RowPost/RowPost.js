import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import  {ImgUrl,API_KEY} from "../../Constants/Constants"
import YouTube from 'react-youtube'
import "./RowPost.css"
function RowPost(props) {
    const [ movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')
        useEffect(()=>{
            axios.get(props.url).then((res)=>{
                console.log(res.data)
                setMovies(res.data.results)
            })
        },[])

        const opts = {
            height: '390',
            width: '100%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
        const handleMovie=(id)=>{
            console.log(id)
            axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res)=>{
                if(res.data.results.length!==0){
                    setUrlId(res.data.results[0])
                }else{
                    console.log("array empty")
                }
            })
          }
  return (
    <div className='row'>
      <h1>{props.title}</h1>
      <div className='posters'>
        {
            movies.map((obj)=>

                <img onClick={()=> handleMovie(obj.id)} className={props.isSmall? 'smallPoster':'poster'} src={`${ImgUrl+obj.backdrop_path}`} alt="" />
            )
        }
        
      </div>
      { urlId && <YouTube opts={opts} videoId={urlId.key}/>
        }

    </div>
  )
}

export default RowPost
