import '../styles/TaskList.scss';
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

    const deleteTimer = async(id) => {
        try {
            await supabase.from("tasks").delete().eq("id", id);
            setTimers(timers.filter((x) => x.id !== id));
        } catch (error) {
            console.log("error", error);
        }
    }

    const startTimer = async(id) => {
        let start_time = new Date().getTime();
        try {
            await supabase.from("tasks").update({is_active: true, start_time}).eq("id", id);
        } catch (error) {
            console.log("error", error);
        }
    }

    const stopTimer = async(id) => {
        let { data, error } = await supabase
            .from("tasks")
            .select(`start_time, task_time`)
            .eq("id", id);
            
        if (error) setError(error.message);

        let current_time = new Date().getTime();
        let task_time = (current_time - data[0].start_time) + data[0].task_time;
        
        try {
            await supabase.from("tasks").update({is_active: false, task_time, start_time: null}).eq("id", id);
        } catch (error) {
            console.log('error', error );
        }
    }

    const resetTimer = async(id) => {
        try {
            await supabase.from("tasks").update({is_active: false, task_time: null, start_time: null}).eq("id", id);
        } catch (error) {
            console.log('error', error );
        }
    }

    return (
        <div className={"task-list"}>
            <h3>Tasks</h3>

            {timers.length ? (
                        timers.map((timer) => (
                            <TaskTimer
                                data={timer}
                                onStart={() => startTimer(timer.id)}
                                onStop={() => stopTimer(timer.id)}
                                onDelete={() => deleteTimer(timer.id)}
                                onReset={() => resetTimer(timer.id)}
                                key={timer.id}/>
                        ))
                    ) : (
                        <div
                            className={
                                "task-list__empty"
                            }
                        >
                            There are no tasks yet.
                        </div>
                    )}

            {!!errorText && (
                <div className={"error-text"}>
                    {errorText}
                </div>
            )}

            <div className={"new-timer"}>
                <input
                    ref={newTimerTextRef}
                    placeholder="Name your task"
                    type="text"
                    onKeyUp={(e) => e.key === "Enter" && addTimer()}
                />
                <button
                    className={"turquoise-flow"}
                    onClick={addTimer}
                >
                    + Add Timer
                </button>
            </div>
        </div>
    )
}

export default TaskList;