import { useRef, useEffect, useState } from "react";

const TaskTimer = ({data, onDelete, onStart, onStop}) => {
    const [lastStart, setLastStart] = useState(0);
    const ticking = lastStart > 0;
    const [milliSeconds, setMilliSeconds] = useState(0);
    const interval = useRef(null);

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
        <div>
            <h4>{data.task_title}</h4>
            <div className={"timer__time"}>
                {time(milliSeconds)}
            </div>
            <div className={"timer__controls"}>
                <button
                    onClick={() => {
                        ticking ? onStop() : onStart();
                        setLastStart((c) => (c === 0 ? new Date().getTime() : 0));
                    }}
                >
                    {milliSeconds === 0 ? "Start" : ticking ? "Pause" : "Resume"}
                </button>
                <button
                    disabled={ticking || milliSeconds === 0}
                >
                    Reset
                </button>
                <button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete();
                }}
            >
                Delete
            </button>
            </div>
        </div>
    )
}

export default TaskTimer;