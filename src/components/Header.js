import '../styles/Header.scss';
import supabase from '../lib/supabase'

const Header = ({user}) => {
    
    const handleLogout = async () => {
        supabase.auth.signOut().catch(console.error);
        window.location.reload();
    };

    return (
        <div className={"header"}>
            <div className={"header__logo"}>⏱ trackrrr</div>
            {user && 
                <div className={"header__user"}>
                    <p className={"header__user-email"}>{user.email}</p>
                    |
                    <a
                        className={"header__user-logout"}
                        onClick={handleLogout}
                    >
                        Logout
                    </a>
                </div>
            }
        </div>
            
    )
}

export default Header;