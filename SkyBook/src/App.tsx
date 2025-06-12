import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap'
import { BiSolidPencil } from "react-icons/bi";

import './App.css'

import NewEntryModal from './NewEntryModal';
function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);

  type Entry = {
    text: string;
    mood: string;
    date: string;
  };

  const handleSaveEntry = (entry: Entry) => {
    setEntries((prev) => [...prev, entry]);
  };
  return (
    <>
      <div className='gradient'>
        {/* <div className="skeleton"></div> */}

        <Container>
          <div className='container text-center'>
            <h1 className='title'>SkyBook</h1>
          </div>
          <div className='container text-center'>
            <h1 className="hello">Hello, what's on your mind today?</h1>
            <Button onClick={() => setIsModalOpen(true)} className='entry-btn'>Add entry <BiSolidPencil /></Button>
          </div>
        </Container>

      </div>

      <Container className='list d-flex  align-items-center justify-content-center'>
        <Row className='w-100'>
          <Col xs={4} className='option-title'>
            <h1>YOUR</h1>
          </Col>
          <Col xs={6} className='option'>
            <p>mood</p>
            <p>thoughts</p>
            <p>feelings</p>
            <p>sincerity</p>
          </Col>
        </Row>
      </Container>

      <Container className="entries mt-5">
        <h2 className="text-center mb-4">Your Entries</h2>
        {entries.length === 0 ? (
          <p className="text-center text-muted">No entries yet. Add one above!</p>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="p-3 mb-3 rounded border shadow-sm bg-light">
              <h5 className="text-primary">Mood: {entry.mood}</h5>
              <p>{entry.text}</p>
              <small className="text-muted">{new Date(entry.date).toLocaleString()}</small>
            </div>
          ))
        )}
      </Container>
      {isModalOpen && (
        <NewEntryModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEntry}
        />
      )}
    </>
  )
}

export default App
