import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from './allChats.css'
import Account from '../account/Account'
import { useContext, useEffect, useState } from 'react';
// import AllContacts from '../allContacts/AllContacts';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import PanelAdmin from '../panelAdmin/PanelAdmin'

function AllChats() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  const menu = event => {
    const menu = document.querySelector(".aMenu")
    const panel = document.querySelector(".mMenu")
    menu.classList.toggle('active')
    panel.classList.toggle('show')
  }
  
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

return (
  <>
    {
      window.innerWidth < 600 ?
        <div className='mMenu'>
          <div className="panel">
            <PanelAdmin key={3} active={"contact"}/> 
          </div>
          <div className='main' style={{ position:"relative" }}>
            <div className='allChats'>
              <div className="aChatTitle">
                <div 
                  className="aMenu" 
                  onClick={menu}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="ChatSort">
                  Chats
                  <select name="Recent Chat" id="reChats" className="reChat">
                    <option value="Contacts">Contacts</option>
                    <option value="Recent Chat">Recent Chat</option>
                  </select>
                </div>
                <button className="tButton">
                  {/* <FontAwesomeIcon className='tbAdd' icon={faPlus} /> */}
                  Crate New Chat
                </button>
              </div>
              <div className="aSearch">
                <div className="aItemSearch">
                  <ion-icon class='aSeIcon' name="search-outline"></ion-icon>
                  <input type="text" className="aSIput" placeholder='Search' />
                </div>
                <select name="categoryChat" id="catChat" className='aSFilter'>
                  <option value="message" className="message">Messages</option>
                </select>
              </div>
            </div>
            <div className="aContactAcc">
              {conversations.length !== 0 ? conversations.map((c) => (
                <Account conversation={c} currentUser={user} />
              )) : null}
            </div>
          </div>
        </div> :
        <div className='main' style={{ position:"relative" }}>
        <div className='allChats'>
          <div className="aChatTitle">
            <div 
              className="aMenu" 
              onClick={menu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="ChatSort">
              Chats
              <select name="Recent Chat" id="reChats" className="reChat">
                <option value="Contacts">Contacts</option>
                <option value="Recent Chat">Recent Chat</option>
              </select>
            </div>
            <button className="tButton">
              {/* <FontAwesomeIcon className='tbAdd' icon={faPlus} /> */}
              Crate New Chat
            </button>
          </div>
          <div className="aSearch">
            <div className="aItemSearch">
              <ion-icon class='aSeIcon' name="search-outline"></ion-icon>
              <input type="text" className="aSIput" placeholder='Search' />
            </div>
            <select name="categoryChat" id="catChat" className='aSFilter'>
              <option value="message" className="message">Messages</option>
            </select>
          </div>
        </div>
        <div className="aContactAcc">
          {conversations.length !== 0 ? conversations.map((c) => (
            <Account conversation={c} currentUser={user} />
          )) : null}
        </div>
        </div>
    }
  </>
  )
}

export default AllChats