import TaskList from '../components/TaskList'
import Header from '../components/Header';

const Home = ({ user }) => {
    return (
        <div>
            <Header email={user.email}/>
            <TaskList user={user} />
        </div>
    )
}

export default Home;