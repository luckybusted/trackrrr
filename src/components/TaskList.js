import supabase from "../lib/supabase";
import { useEffect, useState, useRef } from "react";
import TaskTimer from './TaskTimer';

const TaskList = ({ user }) => {
    const [timers, setTimers] = useState([]);
    const newTimerTextRef = useRef();
    const [errorText, setError] = useState("");

    useEffect(() => {
        fetchTodos().catch(console.error);
    }, []);

    const fetchTodos = async () => {
        let { data: timers, error } = await supabase
            .from("tasks")
            .select("*")
            .order("id", { ascending: false });
        if (error) console.log("error", error);
        else setTimers(timers);
    };

    const addTimer = async () => {
        let timerText = newTimerTextRef.current.value;
        let task_title = timerText.trim();
        if (task_title.length <= 3) {
            setError("Task length should be more than 3!");
        } else {
            let { data: timer, error } = await supabase
                .from("tasks")
                .insert({ task_title, user_id: user.id })
                .single();
            if (error) setError(error.message);
            else {
                setTimers([timer, ...timers]);
                setError(null);
                newTimerTextRef.current.value = "";
            }
        }
    }

    return (
        <div>
            <h3>TASK LIST</h3>



            {timers.length ? (
                        timers.map((timer) => (
                            <TaskTimer
                                data={timer}
                                key={timer.id}/>
                        ))
                    ) : (
                        <span
                            className={
                                "h-full flex justify-center items-center"
                            }
                        >
                            You do have any tasks yet!
                        </span>
                    )}






            {!!errorText && (
                <div className={"error-text"}>
                    {errorText}
                </div>
            )}

            <div className={"new-timer"}>
                <input
                    ref={newTimerTextRef}
                    type="text"
                    onKeyUp={(e) => e.key === "Enter" && addTimer()}
                />
                <button
                    onClick={addTimer}
                >
                    Add Timer
                </button>
            </div>
        </div>
    )
}

export default TaskList;