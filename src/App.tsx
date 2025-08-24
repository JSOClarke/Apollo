import { FinancialProvider } from "./contexts/useFinancialData";
import Layout from "./Layout";
import Home from "./pages/Home";

function App() {
  return (
    <FinancialProvider>
      <div>
        <Layout>
          <Home />
        </Layout>
      </div>
    </FinancialProvider>
  );
}

export default App;
