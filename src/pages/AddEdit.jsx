import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./AddEdit.css";
import Db from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  contact: "",
};
export default function AddEdit() {
  const [state, setState] = useState(initialState);
  const [Data, setData] = useState({});
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => { 
    Db.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
      
    });
    return ()=>{
      setData({})
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...Data[id] });
    } else {
      setState({...initialState});
    }
    return ()=>{
      setState({...initialState})
    }
  },[id, Data]);

  const { name, email, contact } = state;
  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please fill all the given fields");
    } else {
      if(!id){
        Db.child("contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact added successfully");
          }
        });
       
      }else{
        Db.child(`contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact updated successfully");
          }
        });
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name </label>
        <input
          type="text"
          id="name"
          name={"name"}
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name={"email"}
          id="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact </label>
        <input
          type="number"
          name={"contact"}
          id="contact"
          placeholder="Your Contact..."
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ?  "update" : "save"} />
      </form>
    </div>
  );
}
