import React from './chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faFaceSmile, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useRef, useState } from 'react'
import Messages from '../messages/Messages'
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
// import { set } from 'mongoose'
import { io } from "socket.io-client";

function Chat() {
  const { state }  = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userItems, setUserItems] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(state ? state.conversation : JSON.parse(localStorage.getItem("chat_items")));
  const { user } = useContext(AuthContext);
  const socket = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [selectedFile, setSelectedFile] = useState(); 
  const scrollRef = useRef();
  
  const addFiles = event => {
    event.target.classList.toggle('active')
  }

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    // socket.current = io({transports: ['websocket'], upgrade: false})
    socket.current.on("getMessage", data => {
      console.log(data)
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createAt: Date.now(),
      })
    })
  }, [])

  
  useEffect(() => {
    arrivalMessage && 
    currentChat?.members.includes(arrivalMessage.sender) && 
    setMessages((prev)=>[...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", users=>{
      setOnlineUsers(users)
    })
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
        try {
          const res = await axios("/api/users?userId=" + currentChat.members.filter((c) => {
            if(c !== user._id) return c
          })[0]);
          setUserItems(res.data);
        } catch (err) {
          console.log(err);
        }
    };
    getUser();
  },  currentChat);
  
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/messages/" + currentChat?._id)
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(selectedFile){
    //   setNewMessage(selectedFile)
    //   const message = {
    //     sender: user._id,
    //     text: selectedFile,
    //     conversationId: currentChat._id,
    //   };
    //   try {
    //     const res = await axios.post("/upload-file", message);
    //     setMessages([...messages, selectedFile]);
    //     setNewMessage("");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // if(newMessage){
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
      const receiverId = currentChat.members.find(member => member !== user._id)
      // if(onlineUsers.filter((elem)=>{
      //   return elem.userId === receiverId
      // }).length !== 0){
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        })
        
      // }
        try {
          const res = await axios.post("/api/messages", message);
          setMessages([...messages, res.data]);
          setNewMessage("");
        } catch (err) {
          console.log(err);
        }
    // }
  };
  
  window.addEventListener("beforeunload", () => localStorage.removeItem('chat_items'));

  //Upload file
  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  // SCROLL
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);
  
  return (
    <>
    {userItems ? <div className='Chat'>
      <div className="messagesLayout">

        <div className="cPanel">
          <div className="userInfo">
            <Link to="/contact" className="cpreviev">
              <div className=" cPAdd">
                <svg xmlns={PF + "/images/icon/arrow-back-outline.svg"} 
                  class="" 
                  viewBox="0 0 512 512"
                  style={{ height: "2rem" }}
                  >
                  <title>Arrow Back</title>
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/>
                </svg>
              </div>
            </Link>

            <div className="cPUser">
              <img src={userItems.userphoto ? userItems.userphoto : PF+"/images/noAvatar.png"}
                alt="" 
                className="cPImg" 
              />
              {currentChat.members.find((elem) => {
                  if(elem !== user._id){
                    return onlineUsers.find((el) => {
                      return elem === el.userId
                    })
                  }
                }) ?
                <p className="cPActive"></p> : 
                "" 
              }
            </div>
            <div className="cPUName">
              <div className="cPName">{userItems.firstname} {userItems.lastname}</div>
              <div className="cPAtvCount">last online 5 hours ago</div>
            </div>
          </div>
          <div className="cPItem">
            <div className="cPAdd">
              <FontAwesomeIcon icon={faPaperclip} />
              {/* <Link /> */}
            </div>
            <div className="cPAdd">
              <FontAwesomeIcon icon={faEllipsisVertical} />
              {/* <Link /> */}
            </div>
          </div>
        </div>

        <div className="cBox">
          <div className="cBMessag">
            <div className="cBMessagesL">
              <div className="messagesContainer">
                <div className="cMessOther"> 
                  <div className="cMessagDataGroup" ref={scrollRef}>
                    {messages.map((m,index) => (
                      // <div ref={scrollRef}>
                        <Messages key={index} friend={userItems} message={m} own={m.sender === user._id}/>
                      // </div>
                    ))
                    }
                    {/* <div ref={scrollRef} /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="MessagesBlock">
              <div className="mBInput">
                <div className="navigation">
                  <div 
                    className="mAddFiles"
                    onClick={addFiles}
                    >
                  </div>
                  <div className="menu">
                    <ul>
                      <label htmlFor="file-upload">
                        <li style={{ '--i':"0.1s"}}>
                        <svg xmlns={PF + "/images/icon/document-OfflineAudioCompletionEvent.svg"} width="512" height="512" viewBox="0 0 512 512">
                            <title>ionicons-v5-e</title>
                            <path d="M416,221.25V416a48,48,0,0,1-48,48H144a48,48,0,0,1-48-48V96a48,48,0,0,1,48-48h98.75a32,32,0,0,1,22.62,9.37L406.63,198.63A32,32,0,0,1,416,221.25Z" style={{fill:"none",strokeLinejoin:"round",strokeWidth:"32px"}}/>
                            <path d="M256,56V176a32,32,0,0,0,32,32H408" style={{fill:"none",strokeLinejoin:"round",strokeWidth:"32px"}}/>
                        </svg>
                          <input 
                            type="file"
                            id="file-upload"
                            name="file-upload"
                            className='file'
                            onChange={changeHandler}
                          />
                        </li>
                      </label>
                      <label htmlFor="video-upload">
                        <li style={{ '--i':"0.2s" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                          <title>Film</title>
                          <rect x="48" y="96" width="416" height="320" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="384" y="336" width="80" height="80" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="384" y="256" width="80" height="80" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="384" y="176" width="80" height="80" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="384" y="96" width="80" height="80" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="48" y="336" width="80" height="80" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="48" y="256" width="80" height="80" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="48" y="176" width="80" height="80" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="48" y="96" width="80" height="80" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="128" y="96" width="256" height="160" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <rect x="128" y="256" width="256" height="160" rx="28" ry="28" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                        </svg>
                          <input 
                            type="file"
                            id="video-upload"
                            name="video-upload"
                            className='file'
                            accept="video/*"
                          />
                        </li>
                      </label>
                      <label htmlFor="image-upload">
                        <li style={{ '--i':"0.3s" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                          <title>Image</title>
                          <rect x="48" y="80" width="416" height="352" rx="48" ry="48" fill="none" strokeLinejoin="round" strokeWidth="32"/>
                          <circle cx="336" cy="176" r="32" fill="none" strokeMiterlimit="10" strokeWidth="32"/>
                          <path d="M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                        </svg>
                          <input 
                            type="file"
                            id="image-upload"
                            name="image-upload"
                            className='file'
                            accept="image/*"
                          />
                        </li>
                      </label>
                    </ul>
                  </div>
                </div>
                <input 
                  type="text" 
                  className="mMessag"  
                  placeholder='Type a message here'
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <div className="mAddSmiles">
                  <FontAwesomeIcon className='Smiles' icon={faFaceSmile} />
                </div>
                <button 
                  className="mSumbitMess"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> : ""}</>
  )
}

export default Chat