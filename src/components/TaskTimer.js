const TaskTimer = ({data}) => {
    return (
        <div>
            <h4>{data.task_title}</h4>
            <div className={"timer__time"}>00:00:00</div>
            <div className={"timer__controls"}>
                <button>Start</button>
                <button>Reset</button>
            </div>
        </div>
    )
}

export default TaskTimer;