import { useState } from "react";
import { useMediaQuery } from "react-responsive";

/**
 * This is the admin page for managing donations and milestones.
 * It is optimised / only developed for mobile devices with a portrait orientation.
 * @returns 
 */
const Admin = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const [dontCare, setDontCare] = useState<boolean>(false);

    const Warning = () => {
        const warningStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: '100vh',
            width: '100vw',
        } as const;

        return (
            <div style={warningStyle}>
                <h3>Warning: Not Optimised For You</h3>
                <span>This admin panel is only optimised for mobile devices in a portrait orientation.</span>
                <span>If you don't care and want to see it anyways, <a style={{cursor: "pointer"}} onClick={() => setDontCare(true)}>click here</a></span>
            </div>
        )
    }

    return (
        <>
        {(isTabletOrMobile && isPortrait) || dontCare ? <ControlPanel /> : <Warning />}
        </>
    )
}

const ControlPanel = () => {
    return (
        <>
        <h1>Control Panel</h1>
        </>
    )
}

export default Admin;