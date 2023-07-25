import HouseIcon from '@mui/icons-material/House';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const ProfileInfo = ({ data }) => {
    const profileData = [
        {
            icon: <HouseIcon />,
            label: 'Lives in:',
            value: data.livesIn,
        },
        {
            icon: <LocationOnIcon />,
            label: 'From:',
            value: data.from,
        },
        {
            icon: <SchoolIcon />,
            label: 'Studied in:',
            value: data.school,
        },
        {
            icon: <WorkIcon />,
            label: 'Works in:',
            value: data.work,
        },
    ];

    return (
        <ul>
            {profileData.map((item) => (
                item.value && (
                    <li key={item.label}>
                        {item.icon}
                        {item.label} <b>{item.value}</b>
                    </li>
                )
            ))}
        </ul>
    );
};

export default ProfileInfo;
