import '../styles/Timer.scss';
import { useRef, useEffect, useState } from "react";

const TaskTimer = ({data, onDelete, onStart, onStop, onReset}) => {
    const [lastStart, setLastStart] = useState(0);
    const ticking = lastStart > 0;
    const [milliSeconds, setMilliSeconds] = useState(0);
    const interval = useRef(null);

    useEffect(() => {
        if(data.task_time) {
            setMilliSeconds(data.task_time);
        }

        if(data.start_time) {
            setLastStart(data.start_time);
        }
    }, []);

    useEffect(() => {
        
        if (ticking) {
            let lastMillisecs = milliSeconds;
            interval.current = setInterval(
                () => setMilliSeconds(lastMillisecs + new Date().getTime() - lastStart),
                1000
            );
        } else if (interval.current) {
            clearInterval(interval.current);
        }
        // milliSeconds can't be in the deps, we need to only get its latest value when ticking is updated. Otherwise the Timer would be updated too often
    }, [ticking, lastStart]);

    const time = (ms) => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms - hours * 3600000) / 60000);
        const seconds = Math.floor((ms - hours * 3600000 - minutes * 60000) / 1000);
    
        const pad = (n, len) => {
            let result = n + "";
            let digits = 0;
            while (n > 0) {
                n = Math.floor(n / 10);
                digits++;
            }
            if (digits === 0) digits++;
            const zeros = Math.max(0, len - digits);
            for (let i = 0; i < zeros; i++) result = "0" + result;
            return result;
        };
        return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
    };

    return (
        <div className={"timer"}>
            <div className={"timer__left-block"}>
                <h4>{data.task_title}</h4>
                <div className={"timer__time"}>
                    {time(milliSeconds)}
                </div>
            </div>
            <div className={"timer__controls"}>
                <button
                    className={"timer__play"}
                    onClick={() => {
                        ticking ? onStop() : onStart();
                        setLastStart((c) => (c === 0 ? new Date().getTime() : 0));
                    }}
                >
                    <span className={"material-icons"}>
                    {milliSeconds === 0 ? "play_arrow" : ticking ? "pause" : "play_arrow"}
                    </span>
                </button>
                <button
                    className={"timer__reset"}
                    disabled={ticking || milliSeconds === 0}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMilliSeconds(0);
                        setLastStart(0);
                        onReset();
                    }}
                >
                    <span className={"material-icons"}>replay</span>
                </button>
                
            </div>
            <a
                    className={"timer__delete"}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete();
                    }}
            >
                <span className={"material-icons"}>close</span>
            </a>
        </div>
    )
}

export default TaskTimer;