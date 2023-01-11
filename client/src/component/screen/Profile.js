import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'

const Profile =()=>{

    const {state, dispatch} = useContext(UserContext)
    console.log(state)
    const [data, setData] = useState([])
    
    useEffect(()=>{
        fetch('/mypost',{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(res=>{
            setData(res.myPost)
        })
    },[])
    return(
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
                        {state?state.name:"loding"}
                        <div style={{display:"flex",justifyContent:"space-between", width:"110%"}}>
                            <h6>{data.length} posts</h6>
                            <h6> {state ? state.followers.length : <>..loding</>} followers</h6>
                            <h6> {state ? state.following.length : <>..loding</>} following</h6>
                        </div>
                    </h4>
                </div>
            </div>
            <div className="gallery">
                {
                    data.map((item)=>{
                        return <>
                            <img className="item" key={item._id} alt="no internet" src={`${item.image}`}/>
                        </>
                    })
                }
            </div>
        </div>
    )
}

export default Profile;