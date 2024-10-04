import { useEffect, useMemo, useState } from "react";
import App from "./visualiser/App";
import './index.css';

const Countdown = () => {
    const targetDate = new Date("October 4, 2024 18:30:00");

    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
      );

    useEffect(() => {
        const interval = setInterval(() => {
          setCountDown(countDownDate - new Date().getTime());
        }, 1000);
    
        return () => clearInterval(interval);
      }, [countDownDate]);

    const [ hours, minutes, seconds ] = useMemo(() => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
      
        return [days, hours, minutes, seconds];
    }, [countDown]);
    
    return (
        countDown > 0 ? 
        <div className="countdown-container">
            <div className="countdown-content">
                <h1>Royal Tea Fundraiser</h1>
                <p>The royal tea fundraiser starts in...</p>
                <div className="timer">
                    {/* <span>{days} days</span> */}
                    <span><strong>{hours}</strong> hours</span>
                    <span><strong>{minutes}</strong> minutes</span>
                    <span><strong>{seconds}</strong> seconds</span>
                </div>
            </div>
        </div> : <App />
    )
}

export default Countdown;