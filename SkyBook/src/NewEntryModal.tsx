import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './App.css';

type Props = {
  onClose: () => void;
  onSave: (entry: { text: string; mood: string; date: string }) => void;
};

function NewEntryModal({ onClose, onSave }: Props) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');

  const handleSave = () => {
    const date = new Date().toISOString();
    onSave({ text, mood, date });
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header className='modal-header' closeButton>
        <Modal.Title>SkyBook</Modal.Title>
        <Modal.Title>Write new entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMood">
            <Form.Label>Mood</Form.Label>
            <Form.Control
              type="text"
              placeholder="How do you feel?"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formText">
            <Form.Label>Thoughts</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Write here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Entry
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewEntryModal;
