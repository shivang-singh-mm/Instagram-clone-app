import React,{useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom' 
import {UserContext} from '../../App'

const Login =()=>{
    
    const {state ,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const PostData = () =>{
        fetch("/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,
                password
               })
            }).then(res=>res.json())
            .then(data => {
                if(data.error || !email || !password){
                    return console.log("Enter all fields")
                } else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    navigate('/')
                    console.log(data)
                }
        }).catch(err=> console.log(err))
    }

    return(
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Login</h2>
                <input type="text" placeholder="Email" 
                value={email} 
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <input type="text" placeholder="Password" 
                value={password} 
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <button className="btn waves-effect waves-light #64b4f6 blue lighten-2" type="submit" name="action"
                onClick={PostData}>
                    Login
                </button>
                <h5>
                    <Link to='/signup'>Don't have an account</Link>
                </h5>
        </div>
        </div>
    )
}

export default Login;