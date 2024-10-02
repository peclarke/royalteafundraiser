import { TeaAvatar } from '../visualiser/Avatar';
import LightningBolt from '../assets/lightning.png';
import './Competition.css';
import { Chip, Stack } from '@mui/material';

const Competition = () => {
    return (
        <div className="comp-screen">
            <div className="title">
                <span>THE ROYAL TEA FUNDRAISER</span>
            </div>
            <div className="splitter">
                <div className="fst"></div>
                <div className="snd"></div>
            </div>
            <div className="comp-content">
                <div className="main-info">
                    <h1>THE TEA BREWING COMPETITION</h1>
                    <div className="competitors">
                        <div>
                            <h4>JULIA TAYLOR</h4>
                        </div>
                        <div className="comp-avatars">
                            <TeaAvatar who="julia"/>
                            <img src={LightningBolt} id="bolt"/>
                            <TeaAvatar who="bryony" />
                        </div>
                        <div>
                            <h4>BRYONY SMITH</h4>
                        </div>
                    </div>
                </div>
                <div className="comp-info">
                    <span><strong>The Challenge:</strong></span>
                    <span>Brew the best possible tea that you can. Carly Kies will 
                        judge the teas based on the following areas:</span>
                    <Stack direction="row" spacing={1} className="area-stack-cats">
                        <Chip label="Taste" color="success"/>
                        <Chip label="Aroma" color="primary" />
                        <Chip label="Appearance" color="error" />
                        <Chip label="Mouthfeel" color="warning" />
                        <Chip label="X Factor" sx={{backgroundColor: "purple", color: "white"}} />
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export const CompetitionAdminScreen = () => {
    return (
    <div className="adminscreen">
        <h1>Viewing Competition Screen</h1>
        <p>You are currently viewing the competition screen. There are no controls for this area.</p>
        <p>Use the menu button in the top right to manage the viewing experience.</p>
    </div>)
}

export default Competition;