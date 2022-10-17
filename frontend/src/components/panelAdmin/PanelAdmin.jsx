import React from './panelAdmin.css'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function PanelAdmin(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const active = props.active
  // const { loading, error, dispatch } = useFetch("/user")
  var {user} = useContext(AuthContext)
  // const  data = useFetch(`/users?id=${props.url}`)
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('user')
    window.location.reload();
  }

  return (
    <div className='admin'>
      <div className='adUser'>
        <img 
          className='adimg'
          src={PF+"/images/noAvatar.png"} 
          alt=""
        />
        <select name="account" id="account" className='asAccount'>
          <option value="userName">{user.firstname} {user.lastname}</option>
          <option value="faPlus" ><div className="addAcc">+</div> Add New Account</option>
        </select>
      </div>
      <div className="all-chat-items">
          <div 
            className={active === "home" ? "adListIteam active disabled" : "adListIteam"}  
          >
            <span className='asRect'></span>
            <div className='icon-inner adLsIcon'>
              <svg 
                xmlns={PF+"/images/icon/grid-outline.svg"} 
                alt="" 
                className='ionicon s-ion'
                viewBox="0 0 512 512"
                >
                <title xmlns="http://www.w3.org/2000/svg">Grid</title>
                <rect xmlns="http://www.w3.org/2000/svg" x="48" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                <rect xmlns="http://www.w3.org/2000/svg" x="288" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                <rect xmlns="http://www.w3.org/2000/svg" x="48" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                <rect xmlns="http://www.w3.org/2000/svg" x="288" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
              </svg>
            </div>
            Home
          </div>
        <Link to={"/"+user._id} style={{ color: "inherit", textDecoration: "none" }}>
          <div 
            className={active === "chat" ? "adListIteam active disabled" : "adListIteam"} 
            >
            <span className='asRect'></span>
            <div className='icon-inner adLsIcon'>
              <svg 
                xmlns={PF+"/images/icon/chatbubble-ellipses-outline.svg"} 
                alt="" 
                className='ionicon s-ion'
                viewBox="0 0 512 512"
                >
                <title>Chatbubble Ellipses</title>
                <path d="M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a42.63 42.63 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.64 139.09 140.72 48 255.82 48 356.2 48 440 117.54 459.57 209.85a199 199 0 014.43 41.64c0 112.41-89.49 204.93-204.59 204.93-18.31 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.14 31.14 0 00-11.13-2.07 30.7 30.7 0 00-12.08 2.43L81.5 462.78a15.92 15.92 0 01-4.66 1.22 9.61 9.61 0 01-9.58-9.74 15.85 15.85 0 01.6-3.29z" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"/>
                <circle 
                  cx="160" 
                  cy="256" 
                  r="32" />
                <circle cx="256" cy="256" r="32" />
                <circle cx="352" cy="256" r="32"/>
              </svg>
            </div>
            Chat
          </div>
        </Link>
        <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>
          <div 
            className={active === "contact" ? "adListIteam active disabled" : "adListIteam"} 
          >
            <span className='asRect'></span>
            <div className='icon-inner adLsIcon'>
              <svg 
                xmlns={PF+"/images/icon/chatbubble-ellipses-outline.svg"}  
                fill="none" 
                viewBox="0 0 512 512"
                stroke="currentColor"
              >
                <title>Person</title><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
              </svg>
            </div>
            Contact
          </div>
        </Link>
        <div 
          className={active === "notifications" ? "adListIteam active disabled" : "adListIteam"}
        >
          <span className='asRect'></span>
          <div className='icon-inner adLsIcon'>
            <svg 
              xmlns={PF+"/images/icon/notifications-outline.svg"}  className="ionicon" viewBox="0 0 512 512"
            >
              <title>Notifications</title>
              <path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
            </svg>
          </div>
          Notifications
        </div>
        <div 
          className={active === "calendar" ? "adListIteam active disabled" : "adListIteam"} 
        >
          <span className='asRect'></span>
          <div className='icon-inner adLsIcon'>
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
              <title>Calendar</title>
              <rect fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" x="48" y="80" width="416" height="384" rx="48"/>
              <circle cx="296" cy="232" r="24"/>
              <circle cx="376" cy="232" r="24"/>
              <circle cx="296" cy="312" r="24"/>
              <circle cx="376" cy="312" r="24"/>
              <circle cx="136" cy="312" r="24"/>
              <circle cx="216" cy="312" r="24"/>
              <circle cx="136" cy="392" r="24"/>
              <circle cx="216" cy="392" r="24"/>
              <circle cx="296" cy="392" r="24"/>
              <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" d="M128 48v32M384 48v32"/>
              <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" d="M464 160H48"/>
            </svg>
          </div>
          Calendar
        </div>
        <div 
          className={active === "setting" ? "adListIteam active disabled" : "adListIteam"}
        >
          <span className='asRect'></span>
          <div className='icon-inner adLsIcon'>
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
              <title>Settings</title>
              <path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
            </svg>
          </div>
          Settings
        </div>
      
        <div 
          className="adListLOut"
          onClick={logOut}
        >
        <div 
          className='icon-inner adLsIcon'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <title>Power</title>
            <path d="M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
          </svg>
        </div>
          Log out
        </div>
      </div>
    </div>
  )
}

export default PanelAdmin