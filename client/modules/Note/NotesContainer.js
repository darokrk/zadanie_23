import { connect } from 'react-redux';
import Notes from './Notes';
import {
    deleteNoteRequest,
	editNote,
	updateNoteRequest,
} from '../Note/NoteActions';

const mapDispatchToProps = {
    onValueClick: editNote,
	onUpdate: updateNoteRequest,
	onDelete: deleteNoteRequest
};

export default connect(
    null,
    mapDispatchToProps
)(Notes);