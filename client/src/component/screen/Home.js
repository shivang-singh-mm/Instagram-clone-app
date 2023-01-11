import React, { useEffect, useState } from 'react'

const Home =()=>{

    const[data,setData] = useState([])

    useEffect(()=>{
        fetch('/user-info')
        .then(res=>res.json())
        .then(data=>{
            setData(data)
        })
    },[])

    return(
        <div className="home">
            This is the home page. <br />
            This page is secured by context API. All other links will not be opened until you loged in. You can test. <br />
            It is working like a basic instagram. Some parts still need work like profile picture.
            <br />
            <br />
            <br />
            <strong>Here are id's of all users. Go in profile and paste these id's after /...</strong>

        {
            data.map(item=>{
               return <p>{item._id}</p>
            })
        }

        </div>
    )
}

export default Home;