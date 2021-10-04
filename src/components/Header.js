import supabase from '../lib/supabase'

const Header = () => {
    
    const handleLogout = async () => {
        supabase.auth.signOut().catch(console.error);
    };

    return (
        <div>Header <button onClick={handleLogout}>Logout</button></div>
    )
}

export default Header;