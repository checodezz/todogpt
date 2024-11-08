import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Taskboard from "./components/Taskboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
function App() {
  return (
    <>
      <Hero />
      <Taskboard />
      <Footer />
    </>
  );
}

export default App;
