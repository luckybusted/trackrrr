import TaskList from '../components/TaskList'
import Header from '../components/Header';

const Home = ({ user }) => {
    return (
        <div>
            <Header />
            <TaskList user={user} />
        </div>
    )
}

export default Home;