import { AuthProvider } from "./utility/AuthProvider";
import { Outlet } from "react-router";

const App = () => {
  return (
    <AuthProvider>
      <div className="">
        {/* Navbar */}
        <header className="">
          <h1 className="">App Header</h1>
        </header>

        {/* Main content */}
        <main className="">
          <Outlet /> {/* Renders the child routes */}
        </main>

        {/* Footer */}
        <footer className="">
          <p>App Footer ©2025</p>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default App;
