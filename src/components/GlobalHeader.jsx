import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import '../styles/GlobalHeader.scss';
import { Bell, HelpCircle, Search, UserCircle } from "lucide-react";



const GlobalHeader = () => {
    const navigate = useNavigate(); // basic navigaitor
    const [openDropDown, setopenDropDown] = useState(null);  // tracking the dropdown that open
    const dropdownref = useRef() //the hook that tarcking mouse clicks out side of dropdown



    const handleOutsideClick = (e) => {
        if(dropdownref.current && !dropdownref.current.contains(e.target)){
            setopenDropDown(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.addEventListener('mousedown', handleOutsideClick);
    },[]);


    return(
        <header className="global-header">  {/* Global Header that will be used in the project */}
            <div className="header-left"> {/* left site of the header  logos + navlinks*/}
            <img src='https://www.vectorlogo.zone/logos/trello/trello-ar21.svg' 
             alt="terllo logo" className="logo"
             onClick={() => navigate('/')}/>

             <div className="nav-items" ref={dropdownref}> {/* Container for dropdown nav items and clicks */}
                {['Workspaces', 'Recent', 'Starred', 'Templates'].map((label)=> (
                    <div key={label} 
                    className="nav-link" 
                    onClick={() => setopenDropDown(openDropDown === label ? null : label)}>
                        {label}
                        {openDropDown === label && (
                            <div className="dropdown">
                                <p>{label} content</p>
                            </div>
                        )}
                    </div>
                ))}
                <div className="nav-link create-btn"
                onClick={() => setopenDropDown('create')}>
                    Create {/* Label */}
                    {openDropDown === 'create' && (
                        <div className="dropdown">
                            <button onClick={() => navigate('/create/board')}>Create Board</button>
                            <button onClick={() => navigate('/create/workspace')}>Create Workspace</button>
                            <button onClick={() => navigate('/templates')}>Start with Template</button>
                        </div>
                    )}

                </div>
                </div>
                
            </div>
            <div className="header-right">
                <div className="search-bar">
                    <Search size={16}/>
                    <input type="text" placeholder="Search"/>
                </div>
                <Bell className="icon"/>
                <HelpCircle className="icon"/>
                <UserCircle className="icon"/>
            </div>
        </header>
    );
};

export default GlobalHeader;