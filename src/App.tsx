import "./App.css";
import { Layout } from "./components/layout/Layout";
import { AppContextProvider } from "./contexts/AppContext";
import { Page } from "./features/page/Page";

function App() {
  return (
    <AppContextProvider>
      <Layout>
        <Page />
      </Layout>
    </AppContextProvider>
  );
}

export default App;
