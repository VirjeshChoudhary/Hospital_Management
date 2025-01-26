/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu  } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate=useNavigate();

  const handleLogout=async(e)=>{
    await axios.get("https://hospital-management-backend-b1un.onrender.com/api/v1/user/patient/logout",{
      withCredentials:true,
    }).then((res)=>{
      toast.success(res.data.message);
      setIsAuthenticated(false);
    }).catch((error)=>{
      toast.error(error.response.data.message);
    })
  }

  const goToLogin=async()=>{
    navigate("/login");
  }
  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"}>
              Home
            </Link>
            <Link to={"/appointment"}>
              Appointment
            </Link>
            <Link to={"/about"}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <GiHamburgerMenu />: <RxCross2 />          }
        </div>
      </nav>
    </>
  )
}

export default Navbar