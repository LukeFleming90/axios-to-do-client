import '../../App.css';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout