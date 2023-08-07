import "./postForm.scss";
import ImageIcon from "@mui/icons-material/Image.js";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {upload} from "../../db/upload/upload.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {sendFriendRequest} from "../../db/friends/sendFriendRequest.js";
import {addPost} from "../../db/posts/addPost.js";

const PostForm = () => {
    const {currentUser} = useContext(AuthContext);
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const [fileURL, setFileURL] = useState(null);
    const queryClient = useQueryClient();


    const fileRef = useRef();
    const descRef = useRef();

    const handleFileUpload = async () => {
        const files = fileRef.current.files[0];
        if (files) {
            setIsFileLoaded(true);
            setFileURL(URL.createObjectURL(files));
        }
    };

    useEffect(() => {
        if (fileURL) {
            return () => {
                URL.revokeObjectURL(fileURL);
            };
        }
    }, [fileURL]);

    const mutation = useMutation({
        mutationFn: async (data) => addPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries("post");
        }
    });


    const handleSubmit = async e => {
        e.preventDefault();
        const file = fileRef.current.files[0] ? await upload(fileRef.current.files[0]) : "";
        const postObject = {
            description: descRef.current.value,
            img: file.url,
        }
        mutation.mutate(postObject);
        descRef.current.value = "";
        fileRef.current.value = null;
        setFileURL(null);
    }

    return (
        <div className="postForm">
            <div className="postForm__wrapper">
                <div className="postForm__content">
                    <div className="postForm__img">
                        <img src={currentUser.profilePicture} alt="Profile Picture"/>
                    </div>
                    <div className="postForm__input">
                        <textarea placeholder={`What's on your mind ${currentUser.name}?`} ref={descRef}/>
                    </div>
                </div>
                <div className="postForm__actions">
                    <div className="postForm__image">
                        <input type="file" id="file" style={{display:"none"}} name="file" onChange={handleFileUpload} ref={fileRef}/>
                        <label htmlFor="file">
                            <ImageIcon/>
                            <span>Photo/video</span>
                            {isFileLoaded && fileRef.current.files.length !== 0 && <img className="file" alt="" src={fileURL}/>}
                        </label>
                    </div>
                    <button className="btn btn--blue btn--no-min-width" onClick={handleSubmit}>Share</button>
                </div>
            </div>
        </div>
    );
}

export default PostForm;