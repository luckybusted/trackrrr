
import '../styles/App.css';
import supabase from '../lib/supabase'
import AuthForm from './AuthForm';
import Home from '../pages/Home';
import Header from '../components/Header';

function App() {
  const user = supabase.auth.user()

  return (
    <>
      <Header user={user}/>
      {!user ? (
        <div>
          <AuthForm />
        </div>
      ):(
        <>
          <Home user={user}/>
        </>
      )}
    </>
  );
}

export default App;
