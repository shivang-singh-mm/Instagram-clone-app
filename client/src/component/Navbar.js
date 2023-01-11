import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../App';


const Navbar =()=> {

  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)

  const renderList =() =>{
    if(state){
      return [
        <>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/createpost">CreatePost</Link></li>
        
        <li><Link to="/allposts">All-post</Link></li>

        <li><button
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          navigate('/login')
        }}>Log Out
          </button></li>

        </>
      ]}else{
        return[
        <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        </>
      ]}
    
  }

    return(
        <nav>
    <div className="nav-wrapper white" >
      <Link to={state?"/":"/login"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
    );
}

export default Navbar;