import React, { useEffect, useState } from "react";
import Db from "../firebase";
import './Home.css'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { DataSnapshot } from 'firebase/database';
const initialState = {
  name: "ali",
  email: "abu@gmailcom",
  contact: '091234455'
}
const Home = () => {
  const [Data, setData] = useState(initialState);

  useEffect(() => {
    Db.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  }, []);

  const Delete = (id) =>{
    if(window.confirm("Are you sure that you want to delete this contact?")){
      Db.child(`contacts/${id}`).remove((err)=>{
        if(err){
          toast.error(err)
        }else {
          toast.success("Contact Deleted successfully")
        }
      })
    }
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(Data).map((id, index) => (
              
              <tr key={id}>
                <td >{index + 1}</td>
                <td>{Data[id]?.name}</td>
                <td>{Data[id]?.email}</td>
                <td>{Data[id]?.contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                  <button className="btn btn-edit">Edit</button>
                  </Link>
                
                  <button className="btn btn-delete" onClick={(()=> Delete(id))}>Delete</button>
                  <Link to={`/view/${id}`}>
                  <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            )
          )}
           {/* {Data.map(d => (
                <h1>{d.name}</h1>
            ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
