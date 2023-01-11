import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'


const UserProfile =()=>{

    const {state, dispatch} = useContext(UserContext)
    const [pic, setPic] = useState([])
    const [data, setData] = useState('')
    const {userId} = useParams()
    const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userId) : true)

    
    useEffect( ()=>{
        fetch(`/user/${userId}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(res=>{
            setData(res.user)
            setPic(res.post)
        })
    },[data])



    const followUser = () =>{
        fetch('/follow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userId,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            // setData((prevState)=>{
            //     return{
            //         ...prevState,
            //         user:{
            //             ...prevState.user,
            //             followers:[...prevState.user.followers,data._id]
            //         }
            //     }
            // })
            setShowFollow(false)
        })
    }

    const unFollowUser = () =>{
        fetch('/unfollow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userId,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            // setData((prevState)=>{
            //     return{
            //         ...prevState,
            //         user:{
            //             ...prevState.user,
            //             followers:[...prevState.user.followers,data._id]
            //         }
            //     }
            // })
            setShowFollow(true)
        })
    }


    return(
        <>
        {UserProfile ? 
        <div style={{maxWidth:"850px", margin:"10px auto"}}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin: "20px 0px",
            borderBottom: "1px solid grey"
        }}>
            <div>
                <img alt="error" style={{width:"160px", height:"160px", borderRadius:"80px"}} 
                src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzV8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" />
            </div>
            <div>
                <h4>
                    {data ? data[0].name : <>..loading</>} 
                    <div style={{display:"flex",justifyContent:"space-between", width:"110%"}}>
                        <h6>{pic.length} posts</h6>
                        <h6> {data ? data[0].followers.length : <>..loading</>} followers</h6>
                        <h6>{data ? data[0].following.length : <>..loading</> } following</h6>
                    </div>
                </h4>
                {
                    showFollow ? 
                    <button onClick={()=>followUser()} className="btn waves-effect waves-light #64b4f6 blue lighten-2" type="submit" name="action">
                    Follow
                </button> :
                
                <button onClick={()=>unFollowUser()} className="btn waves-effect waves-light #64b4f6 blue lighten-2" type="submit" name="action">
                    Un-Follow
                </button>

                }
                
            </div>
        </div>
        <div className="gallery">
            {
                pic.map((item)=>{
                    return <>
                        <img className="item" key={item._id} alt="no internet" src={`${item.image}`}/>
                    </>
                })
            }
        </div>
    </div>
        :<h2>..Loading..</h2> }
        
        </>
    )
}

export default UserProfile;