import toast from "react-hot-toast";
import { AuthProvider } from "./utility/AuthProvider";
import { Outlet } from "react-router";
import "./index.css";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <AuthProvider>
      <div className="wrapper">
        {/* Navbar */}
        <header className="header">
          <h1 className="">App Header</h1>
          <button onClick={() => toast.success("Good job!")}>Toast test</button>
          <NavBar />
        </header>

        {/* Main content */}
        <main className="main">
          <Outlet /> {/* Renders the child routes */}
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>App Footer ©2025</p>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default App;
