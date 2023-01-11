import Navbar from './component/Navbar'
import './App.css';
import React,{createContext,useContext,useEffect,useReducer} from 'react'
import {BrowserRouter, Route, Routes,useNavigate} from 'react-router-dom' 
import Home from './component/screen/Home'
import Login from './component/screen/Login'
import SignUp from './component/screen/SignUp'
import Profile from './component/screen/Profile'
import CreatePost from './component/screen/Create-post'
import Logout from './component/screen/Logout-page'
import UserProfile from './component/screen/UserProfile'
import AllPosts from './component/screen/Allposts'
import {reducer, initialState} from './reducers/userReducer' 


export const UserContext = createContext()


const Routing = ()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
     const user = JSON.parse(localStorage.getItem("user"))
     console.log(user)
     if(user){
      dispatch({type:"USER",payload:user})
     }
     else {
      navigate('/login')
     }
  },[])
  return (
  < Routes>
      <Route exact path="/" element={<Home />}>
      </Route>
      <Route path='/signup' element={<SignUp />}>
      </Route>
      <Route path='/login' element={<Login />}>
      </Route>
      <Route exact path='/profile' element={<Profile />}>
      </Route> 
      <Route path='/createpost' element={<CreatePost />}>
      </Route>
      <Route path='/logout' element={<Logout />}>
      </Route>
      <Route path='/profile/:userId' element={<UserProfile />}>
      </Route>
      <Route path='/allposts' element={<AllPosts />}>
      </Route>
  </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      < BrowserRouter > 
        < Navbar />
        <Routing />
      </ BrowserRouter >
    </UserContext.Provider>
     
  );
}

export default App;
