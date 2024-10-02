import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const Auth = ({children}: { children: any}) => {
    const password = import.meta.env.VITE_PASSWORD;

    const loggedIn = localStorage.getItem('loggedIn') === "true";

    const [psw, setPsw] = useState<string>("");
    const [err, setErr] = useState<string>("");

    const login = async () => {
        if (password !== psw) {
            setErr("Error: Wrong password")
        } else {
            localStorage.setItem('loggedIn', 'true');
            window.location.reload();
        };
    }

    if (loggedIn) return children;

    return (
        <div className="authenticate">
            <h3>Authentication Panel</h3>
            <span style={{marginTop: '-2em'}}>Royal Tea Fundraiser</span>
            <TextField type="password" value={psw} onChange={(e: any) => setPsw(e.target.value)} />
            <Button variant="contained" onClick={login}>Submit</Button>
            <span style={{color: "red"}}>{err}</span>
            <hr></hr>
            <p>Not meant to be here? Click <a href="/">here</a> to go back.</p>
        </div>
    )
}

export default Auth;