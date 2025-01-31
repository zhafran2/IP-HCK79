import {Link, useNavigate } from "react-router";
import logo from '../Quizha.png'
export default function Navbar() {
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.clear();
    navigate("/login");
  }
  
  return (
    <>
      <nav className="navbar flex justify-between items-center bg-gray-800 px-6 py-4 shadow-md">
  {/* Left side: Logo and Add Question */}
  <div className="logo-and-add flex items-center space-x-4">
    <Link to={'/'}>
    <img 
      src={logo} 
      alt="Logo" 
      className="logo-image w-10 h-10 object-cover" 
    /></Link>
    <button 
      className="button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
    ><Link to={'/add'}>
      Add Question</Link>
    </button>
  </div>
  {/* Right side: Log Out */}
  <button 
    className="logout-button bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
    onClick={handleLogOut}
  >
    Log Out
  </button>
</nav>

    </>
  );
}
