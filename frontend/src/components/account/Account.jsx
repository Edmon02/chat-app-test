import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './account.css';
import { io } from "socket.io-client";


function Account({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const socket = useRef();
  const navigate = useNavigate()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
  }, [])
  
  useEffect(() => {
    socket.current.emit("addUser", currentUser._id)
    socket.current.on("getUsers", users=>{
      setOnlineUsers(users)
    })
  }, [user]);
  
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    
    const getUser = async () => {
      try {
        const res = await axios("/api/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  
  // useEffect(() => {
  //   const getFriends = async () => {
  //     const res = await axios.get("/api/users/friends/"+ currentUser._id)
  //     console.log(res)
  //     setFriends(res.data)
  //   };

  //   getFriends()
  // }, [currentUser._id]);

  // useEffect(() => {
  //   setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  // }, [friends, onlineUsers]);

  const handlClick = () => {
    localStorage.setItem("chat_items", JSON.stringify(conversation))
    navigate(`/${currentUser._id} `, { state:  {conversation, active: conversation.members.find((elem) => {
      if(elem !== currentUser._id){
        return onlineUsers.find((el) => {
          return elem === el.userId
        })
      }
    })}})
  }

  return (
    <>
    {user ? 
      // onlineFriends.map((o) => (
        <button
          className='button'
          onClick={handlClick}
        >
        <div className="aAccounts ">
        <div className="aAccount">
          <div className="aImgA">
            <img src={ PF+'/images/noAvatar.png'}
              alt="" 
              className="aIUser" />
              {onlineUsers ? conversation.members.find((elem) => {
                if(elem !== currentUser._id){
                  return onlineUsers.find((el) => {
                    return elem === el.userId
                  })
                }
              }) ? 
                <p className="aActive"></p> : 
                "" 
              :""}
          </div>
          <div className="aNaTA">
            <p className="aName">{user?.firstname+" "+user?.lastname}</p>
            {/* <p className="aType">... write</p> */}
          </div>
          <p className="aAcTime">1 minute ago</p>
        </div>
        <div className="aTexts">
          {/* <p className="aText">Most of its text is made up from sections 1.10.32–3 of Cicero's De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes). 
          </p> */}
          {/* <div className="aTCount">2</div> */}
        </div>
        </div>
        </button> : 
        ""
      }
    </>
  )
}

export default Account