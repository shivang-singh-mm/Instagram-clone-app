import axios from 'axios'
import React,{useContext, useEffect, useState} from 'react'
import { UserContext } from '../../App'

const AllPosts =()=>{

     const [data, setData] = useState([])
     const {state,dispatch} = useContext(UserContext)
     

     useEffect(()=>{
        axios.get('/allposts',{
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        .then((data)=>{ 
            setData(data.data.posts)
            console.log(data)
        })
        .catch((err)=>console.log(err))
     },[])

     const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
                   console.log(result)
          const newData = data.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }

  const unLikePost = (id)=>{
    fetch('/unlike',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
      //   console.log(result)
      const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
  })
}

    const comments  = (text,postId) =>{
        fetch('/comment',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>console.log(err))
        
    }

    return(
        <div className="home">
            
            {
                data.map((singleData)=>{
                    return <div className="card home-card">
                    <h5>{singleData.title}</h5>
                    <div className="card-image">
                        <img alt="technical" src={`${singleData.image}`} />
                    </div>
                <div className="card-content">
                    {
                        singleData.likes.includes(state._id) 
                        ? 
                        <button style={{border:"none"}}  onClick={()=>unLikePost(singleData._id)}>
                        <i style={{color:"red"}} className="material-icons"    
                        >favorite</i>
                        </button>
                        :
                        
                        <button style={{border:"none"}} onClick={()=>likePost(singleData._id)}><i style={{color:"white"}} className="material-icons"    
                        >favorite</i></button>

                    }
                
               
                
                <h6>{singleData.likes.length}</h6>
                    <h6>Cation</h6>
                    <p>{singleData.body}</p>
                    <h6><span>singleData.postedBy.name</span></h6>
                    {
                        singleData.comments.map(record=>{
                            return(
                                <h6 key={record._id} ><span style={{fontWeight:"500"}}>record.name: </span>{record.text}</h6>
                            )
                        })
                    }

                    <form 
                    onSubmit={(e)=>{e.preventDefault()
                    comments(e.target[0].value,singleData._id)
                     console.log(e.target[0].value,singleData._id)}}   
                    >
                        <input type="text" placeholder="comment"></input>
                    </form>
                    
                </div>
                </div>
                })
            } 
       

        </div>
    )
}

export default AllPosts;