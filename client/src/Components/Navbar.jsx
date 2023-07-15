import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


function Navbar(props) {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const x = props.x;


    const handleLogout = () => {
        cookie.remove("jwt");
        navigate("/");
    };

    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="navbar-brand">
                Sathyameva Jayathe
            </div>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <div className="nav-item nav-link active" >
                        Home<span className="sr-only">(current)</span>
                    </div>
                </div>
            </div>
            <div>
                <div id="user_name" style={{ color: 'aliceblue' }}>
                    {x}
                </div>
            </div>
            <div>
                <a className="nav-item nav-link active" href="/">
                    <button className="bg-primary" style={{ margin: '0 30px' }} onClick={handleLogout}>
                        Logout
                    </button>
                </a>
            </div>
        </nav>
    </>
    );
}
export default Navbar;