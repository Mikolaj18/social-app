import "./postOptions.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PostOptions = () => {
    return (
        <div class="post__options">
            <ul>
                <li>
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