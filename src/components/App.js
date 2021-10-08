import supabase from '../lib/supabase'
import AuthForm from './AuthForm';
import Home from '../pages/Home';
import Header from '../components/Header';
import Footer from './Footer';

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
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
