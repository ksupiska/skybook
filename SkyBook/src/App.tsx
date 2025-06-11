import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Button } from 'react-bootstrap'
import { BiSolidPencil } from "react-icons/bi";

import './App.css'

function App() {

  return (
    <>
      <div className='gradient'>
        <Container>
          <div className='container text-center'>
            <h1 className='title'>SkyBook</h1>
          </div>
          <div className='container text-center'>
            <h1 className="hello">Hello, what's on your mind today?</h1>
            <Button className='entry-btn'>Add entry <BiSolidPencil/></Button>
          </div>

        </Container>
      </div>
    </>
  )
}

export default App
