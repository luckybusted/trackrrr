
import '../styles/App.css';
import supabase from '../lib/supabase'
import AuthForm from './AuthForm';
import Home from '../pages/Home';

function App() {
  const user = supabase.auth.user()

  return (
    <>
      {!user ? (
        <div>
          <AuthForm />
        </div>
      ):(
        <>
          <Home user={user}/>
          <pre>
            <code>
              {JSON.stringify(user, null, 2)}
            </code>
          </pre>
        </>
      )}
    </>
  );
}

export default App;
