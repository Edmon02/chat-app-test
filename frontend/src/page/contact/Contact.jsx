import PanelAdmin from '../../components/panelAdmin/PanelAdmin'
import AllChats from '../../components/allChats/AllChats'
import React from './contact.css'
// import { useLocation } from 'react-router-dom';

function Contact() {
  // const location = useLocation();
  // const id = location.pathname.split("/")
  return (
     <div className='box'>
          {
            window.innerWidth >= 600 ?
              <PanelAdmin key={3} active={"contact"}/> :
              ""
          }
          <AllChats />
     </div>
  )
}

export default Contact