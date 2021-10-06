import supabase from '../lib/supabase'

const Header = ({email}) => {
    
    const handleLogout = async () => {
        supabase.auth.signOut().catch(console.error);
    };

    return (
        <div>
            <div className={"header__logo"}>trackrrr</div>
            <div className={"header__user"}>
                <p>{email}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
            
    )
}

export default Header;