import "./App.css";
import { useAppContext } from "./contexts/AppContext";

function App() {
  const { features } = useAppContext();

  return (
    <>
      {features.map((feature) => (
        <p key={feature.id}>{feature.name}</p>
      ))}
    </>
  );
}

export default App;
