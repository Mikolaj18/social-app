import "./userProfile.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getSingleUserData} from "../../db/user/getSingleUserData.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import HouseIcon from '@mui/icons-material/House';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const UserProfile = () => {
    const {id} = useParams();
    const {isLoading, error, data} = useQuery({
        queryKey: ["profile"],
        queryFn: () => getSingleUserData(id),
    });

    console.log(data);
    return (
        <section className="profile">
            {isLoading ? <Spinner/> : error ? "Something went wrong" :
                <div className="profile__wrapper">
                    <div className="profile__cover">
                        <img
                            src="https://scontent-waw1-1.xx.fbcdn.net/v/t1.18169-9/1456143_574505342603752_1000848339_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=pXbVZybiZcMAX8MTvuC&_nc_ht=scontent-waw1-1.xx&oh=00_AfDFJ9W0uYEQai294c-8l4gdvsNCmm04fkvQPsiDCsFOiA&oe=64E07E82"/>
                    </div>
                    <div className="profile__content">
                        <div className="profile__flex">
                            <div className="profile__data">
                                <div className="profile__data-img">
                                    <img src={data.profilePicture} alt="Profile picture"/>
                                </div>
                                <div className="profile__data-info">
                                    <h1>{data.name} {data.surname}</h1>
                                    <p>370 friends</p>
                                </div>
                            </div>

                            <div className="profile__button">
                                {data._id === id &&
                                    <button className="btn btn--blue">Add to friends</button>
                                }
                                <button className="btn btn--green">Edit profile</button>
                            </div>
                        </div>
                        <div className="profile__flex profile__flex--1000">
                            <div className="profile__personal">
                                <h2>Informations</h2>
                                <ul>
                                    {data.livesIn &&
                                        <li>
                                            <HouseIcon/>
                                            Lives in: <b>{data.livesIn}</b>
                                        </li>
                                    }
                                    {data.from &&
                                        <li>
                                            <LocationOnIcon/>
                                            From: <b>{data.from}</b>
                                        </li>
                                    }
                                    {data.school &&
                                        <li>
                                            <SchoolIcon/>
                                            Studied in: <b>{data.school}</b>
                                        </li>
                                    }
                                    {data.work &&
                                        <li>
                                            <WorkIcon/>
                                            Works in: <b>{data.work}</b>
                                        </li>
                                    }
                                </ul>
                            </div>
                            <div className="profile__posts">
                                <h2>Posty</h2>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default UserProfile;