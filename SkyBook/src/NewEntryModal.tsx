import { useState, useEffect } from 'react';

import './modal.css'
type Props = {
    onClose: () => void;
    onSave: (entry: { text: string; mood: string; date: string }) => void;
};

const moodOptions = [
    { label: 'Happy', value: 'happy' },
    { label: 'Sad', value: 'sad' },
    { label: 'Angry', value: 'angry' },
    { label: 'Calm', value: 'calm' },
    { label: 'Tired', value: 'tired' },
];

export default function NewEntryModal({ onClose, onSave }: Props) {
    const [text, setText] = useState('');
    const [mood, setMood] = useState('');
    const [closing, setClosing] = useState(false);

    const handleSave = () => {
        const date = new Date().toISOString();
        onSave({ text, mood, date });
        startClose();
    };

    const startClose = () => {
        setClosing(true);
    };

    useEffect(() => {
        if (closing) {
            const timeout = setTimeout(() => {
                onClose();
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [closing, onClose]);

    const moodClass = mood ? `modal-${mood}` : '';

    return (
        <div className={`modal-backdrop ${closing ? 'fade-out' : 'fade-in'}`}>
            <div className={`modal-content ${closing ? 'slide-out' : 'slide-in'} ${moodClass}`}>
                <h2>Write new entry</h2>
                <div className="mood-buttons">
                    {moodOptions.map((option) => (
                        <button
                            key={option.value}
                            className={mood === option.value ? 'active' : ''}
                            onClick={() => setMood(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <label>
                    Thoughts:
                    <textarea
                        className={`custom-textarea taxtarea-${mood.toLowerCase()}`}
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write here..."
                    />
                </label>
                <div className="modal-buttons">
                    <button onClick={startClose}>Cancel</button>
                    <button className='save-btn' onClick={handleSave}>Save Entry</button>
                </div>
            </div>
        </div>
    );
}
