import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function Filter() {

    const[searchItem, setSearchItem] = useState('');
    const [filteredUsers, setfilteredUsers] = useState([]);
    const[apiUsers, setApiUsers] =useState([]);
    // initialize the loading state as true
    const[loading,setLoading] =useState(true);
    // initialize the error state as null
    const[error,SetError] =useState(null);


    useEffect(()=>{
        fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data =>{
                setApiUsers(data.users)
                setfilteredUsers(data.users)
            })
        .catch(err=> {
            console.log(err)
            SetError(err)
        })
        .finally(()=>{
            // wether we sucessfully get the users or not,
            //update the loading state
            setLoading(false)
        })
    },[])

    const handleInputChange =(e) =>{
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems= apiUsers.filter((user)=>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setfilteredUsers(filteredItems)
        
    }

  return (
    <div>
        <input
    type='text'
    value={searchItem}
    onChange={handleInputChange}
    placeholder='Type to search'
    
    />
    <br/>
    {/* if the data is loading */}
    {loading && <CircularProgress/>}

    {/* if there's an error, show a proper message */}
    {error && <p>There was an error loading the users</p>}

    {/* if it finished loading, render the items */}
    {!loading && !error && filteredUsers.length ===0 
    ?<p>No Users Found</p>
    :<ul>{filteredUsers.map(user =>
        <li key={user.id}>{user.firstName}</li>)}</ul>

    }
    </div>
  )
}
