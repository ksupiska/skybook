import 'bootstrap/dist/css/bootstrap.min.css'

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const savedEntries = localStorage.getItem('entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSaveEntry = (entry: Entry) => {
    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
  };
  const handleDeleteEntry = (indexToDelete: number) => {
    const updatedEntries = entries.filter((_, index) => index !== indexToDelete);
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries)); // если используешь localStorage
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

      <Container className='list d-flex align-items-center justify-content-center py-4'>
        <Row className='w-100 align-items-center text-center text-md-start'>
          <Col xs={12} md={4} className='option-title'>
            <h1>YOUR</h1>
          </Col>
          <Col xs={12} md={6} className='option'>
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
          entries.map((entry, index) => {
            const moodClass = `entry-${entry.mood.toLowerCase()}`;
            return (
              <div
                key={index}
                className={`entry-box ${moodClass}`}
              >
                <h5 className="text-primary">Mood: {entry.mood}</h5>
                <p>{entry.text}</p>
                <small className="text-muted">
                  {new Date(entry.date).toLocaleString()}
                </small>
                <div className="mt-2 text-end">
                  <Button className={`delete-btn-${entry.mood.toLowerCase()}`} type='button' onClick={() => handleDeleteEntry(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
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
