import './App.css'
import { TicketForm } from './components/TicketForm'
import { NavBar } from './components/NavBar'
import { useState } from 'react';

function App() {
  const [navigation, setNavigation] = useState([
    { name: 'Tickets', href: '#', current: true },
  ]);


  const renderTicketForm = () => {
    if(navigation[0].current) {
      return(
        <TicketForm/>
      );
    }
  }


  return (
    <div>
      <NavBar navigation={navigation} setNavigation={setNavigation}/>
      {renderTicketForm()}
    </div>
  )
}

export default App
