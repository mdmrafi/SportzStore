import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-500 font-semibold"
      : "text-gray-600 hover:text-blue-500";

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="flex max-w-7xl mx-auto px-6 py-4 items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold mr-40">MyApp</h1>

        {/* Links */}
        <div className="flex gap-10">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/allequipment" className={linkClass}>All Sports Equipment</NavLink>
          <NavLink to="/addequipment" className={linkClass}>Add Equipments</NavLink>
          <NavLink to="/myequipment" className={linkClass}>My Equiupments</NavLink>
          <NavLink to="/addequipment" className={({ isActive }) => `${linkClass({ isActive })} self-end`}>Login Or Register</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
