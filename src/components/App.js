import supabase from '../lib/supabase'
import AuthForm from './AuthForm';
import Home from '../pages/Home';
import Header from '../components/Header';

function App() {
  const user = supabase.auth.user()

  return (
    <>    
      {!user ? (
        <div className={"container"}>
          <AuthForm />
        </div>
      ):(
        <>
          <Header user={user}/>
          <Home user={user}/>
        </>
      )}
    </>
  );
}

export default App;
