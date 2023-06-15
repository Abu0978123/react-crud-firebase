import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Db from '../firebase';
import './View.css';

export default function View() {
  const [user, setUser] = useState({});
  const {id} = useParams();
  useEffect(() => {
     Db.child(`contacts/${id}`)
     .get().then((snapshsot)=>{
      if(snapshsot.exists()){
        setUser({...snapshsot.val()});
      }else{
        setUser({});
      }
     })
  }, [id])
  // console.log(id)
  return (
    <div  style={{marginTop: "150px"}}>
      <div>
       <div className='card'>
        <div className='card-header'>
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: {id}</strong>
          <br /><br />
          <strong>Name: {user.name}</strong>
          <br /><br />
          <strong>Emaail: {user.email}</strong>
          <br /><br />
          <strong>Contact: {user.contact}</strong>
          <br /><br />
          <Link to={'/'}>
            <button className='btn btn-edit'>Go Back</button>
          </Link>
        </div>
       </div>
      </div>
    </div>
  )
}
