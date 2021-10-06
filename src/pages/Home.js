import TaskList from '../components/TaskList'


const Home = ({ user }) => {
    return (
        <div className={"container"}>            
            <TaskList user={user} />
        </div>
    )
}

export default Home;