import React, { PropTypes } from 'react';
import Note from './Note';
import styles from './Note.css';
import Edit from '../../components/Edit';

const Notes = ({ notes, laneId, onUpdate, onValueClick, onDelete }) => {
    return (<ul className="notes">{notes.map((note) =>
        <Note
            id={note.id}
            key={note.id}
            editing={note.editing}
            laneId={laneId}
        >
            <Edit
                editing={note.editing}
                value={note.task}
                onValueClick={() => onValueClick(note.id)}
                onUpdate={(task) => onUpdate({
                        ...note,
                        task,
                        editing: false,
                    })
                }
                onDelete={() => onDelete(note.id, laneId)}
            />
        </Note>
    )}</ul>);
};

Notes.propTypes = {
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    laneId: PropTypes.string,
    editNote: PropTypes.func,
    notes: PropTypes.array,
};

export default Notes;