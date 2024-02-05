import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Clock(): React.ReactElement {
    const [time, setTime] = useState<string>(getTime());
    const [timeCB, setTimeCB] = useState<() => string>(() => getTime);

    function getTime(): string {
        return new Date().toLocaleTimeString();
    }
    function getFakeTime(): string {
        return new Date().toISOString();
    }

    // Clicking one of the time format buttons changes the callback that gets
    //+ the time.
    function changeFormat(newTimeCB: () => string): void {
        setTimeCB(() => newTimeCB);

        // setState does not update state synchronously.  Therefore, using
        //+ setTimeCB with timeCB will not trigger a re-render immediately because
        //+ timeCB will return the same value as the previous state.  Using
        //+ setTime with newTimeCB will immediately trigger a re-render as the
        //+ time state has been modified.  Otherwise, time is not re-rendered
        //+ until interval delay sets the time state
        setTime(newTimeCB());
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(timeCB());
        }, 1000);
        return () => clearInterval(interval);
    }, [timeCB]);

    return (
        <div className="clock-container">
            <p>{time}</p>
            <button onClick={() => changeFormat(getFakeTime)}>Fake Time</button>
            <button onClick={() => changeFormat(getTime)}>Real Time</button>
        </div>
    );
}
