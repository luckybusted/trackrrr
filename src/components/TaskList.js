import supabase from "../lib/supabase";
import { useEffect, useState, useRef } from "react";

const TaskList = ({ user }) => {
    const [timers, setTimers] = useState([]);
    const newTimerTextRef = useRef();
    const [errorText, setError] = useState("");

    const addTimer = async () => {
        let timerText = newTimerTextRef.current.value;
        let task = timerText.trim();
        if (task.length <= 3) {
            setError("Task length should be more than 3!");
        } else {
            let { data: todo, error } = await supabase
                .from("todos")
                .insert({ task, user_id: user.id })
                .single();
            if (error) setError(error.message);
            else {
                setTimers([todo, ...timers]);
                setError(null);
                newTimerTextRef.current.value = "";
            }
        }
    }

    return (
        <div>
            <h3>TASK LIST</h3>
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