import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1> <i class="fa-solid fa-bug"></i> Bug Tracker</h1>
      <div className="links">
        <a href="/" className="nav-link" >Hi, Rohan Shirke</a>
        <a href="/" className="nav-link" >Logout</a>
      </div>
    </nav>
  );
}
 
export default Navbar;