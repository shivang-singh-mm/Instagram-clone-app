import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const SignUp =()=>{
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const PostData = () =>{
        fetch("/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
               })
            }).then(res=>{
                console.log(res)
                res.json()
                })
            .then(data => {
                if(!name || !email || !password){
                    return console.log("error")
                } else{
                    navigate('/login')
                }
        }).catch(err=> console.log(err))
    }


    return(
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Sign Up</h2>
                <input type="text" placeholder="Name" 
                value={name} 
                onChange={(e)=>{
                    setName(e.target.value)
                }}/>
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
                <button onClick={PostData} className="btn waves-effect waves-light #64b4f6 blue lighten-2" type="submit" name="action">
                    Sign-Up
                </button>
                <h5>
                    <Link to='/login'>Already have an account</Link>
                </h5>
        </div>
        </div>
    )
}

export default SignUp;