import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreatePost = () =>{
    
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")    
    const [url, setUrl] = useState("")    

    
    const navigate = useNavigate()

    useEffect(()=>{
      if(url){
      fetch("/createpost",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            title,
            body,
            image:url
           })
        }).then(res=>{
            res.json()
            })
        .then(data => {
          if(!image || !title || !body){
              return console.log("error")
          } else{
              navigate('/allposts')
          }
    }).catch(err=> console.log(err))
  }
    },[url])

    const postDetails = async (e)=>{
      e.preventDefault()

      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","insta-clone")
      data.append("cloud_name","djicl1vya")
      await fetch("https://api.cloudinary.com/v1_1/djicl1vya/image/upload/",{
        method:"post",
        body:data
      }).then(res=>res.json())
      .then(data=>setUrl(data.url))
      .catch(err=>console.log(err))


    }

   
    

    return(
        <div
        style={{margin: "10px auto",
        maxWidth:"500px",
        padding: "10px",
        textAlign:"center"}}>

          <form> 
            <input type="text" placeholder="title" 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} />

            <input type="text" placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)} />

            <div className="file-field input-field">
      <div className="btn">

        <span>Upload Image</span>
        <input type="file" 
        onChange={e=>setImage(e.target.files[0])} />

      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
        
      </div> 
    </div>
    <button className="btn waves-effect waves-light #64b4f6 blue darken-2" type="submit" onClick={postDetails}>
                    Post
                </button>
                </form>
        </div>
    )
}

export default CreatePost