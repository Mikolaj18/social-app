import "./postOptions.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PostOptions = ({onEdit}) => {
    return (
        <div className="post__options">
            <ul>
                <li onClick={onEdit}>
                    <EditIcon/>
                    Edit post
                </li>
                <li>
                    <DeleteIcon/>
                    Delete Post
                </li>
            </ul>
        </div>
    );
}

export default PostOptions;