import supabase from '../lib/supabase'
import AuthForm from './AuthForm';
import Home from '../pages/Home';
import Header from '../components/Header';
import Footer from './Footer';
import { useEffect, useState } from 'react/cjs/react.development';

function App() {
  const user = supabase.auth.user()
  const [login, setLogin] = useState(false);
  supabase.auth.onAuthStateChange((event, session) => {
    setLogin(event === "SIGNED_IN");
  })

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
      <Footer />
    </>
  );
}

export default App;
