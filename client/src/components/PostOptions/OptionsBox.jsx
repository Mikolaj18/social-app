import "./optionsBox.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const OptionsBox = ({onEdit, onDelete}) => {
    return (
        <div className="optionsBox">
            <ul>
                <li onClick={onEdit}>
                    <EditIcon/>
                    Edit
                </li>
                <li onClick={onDelete}>
                    <DeleteIcon/>
                    Delete
                </li>
            </ul>
        </div>
    );
}

export default OptionsBox;