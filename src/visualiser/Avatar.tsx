import { Avatar } from "@mui/material"

import Julia from '../assets/julia.png';
import Bryony from '../assets/bryony.png';


export const TeaAvatar = ({who}: {who: "julia" | "bryony"}) => {
    return (
        <Avatar 
            src={who === "julia" ? Julia : Bryony}
            className="custom-avatar"
        />
    )
}

const CombinedAvatars = () => {
    return (
        <div className="avatar-container">
            <TeaAvatar who="julia" />
            <TeaAvatar who="bryony" />
        </div>
    )
}

export default CombinedAvatars;