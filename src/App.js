import "./App.scss";
import AppRouter from "./appRouter";
import "./firebase/config";

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
