import { ModalProvider } from "./contexts/ModalContext";
import { ProjectionsProvider } from "./contexts/ProjectionContext";
import { FinancialProvider } from "./contexts/useFinancialData";
import { YearProjectionProvider } from "./contexts/YearProjectionDetailsContext";
import Layout from "./Layout";
import Home from "./pages/Home";

function App() {
  return (
    <FinancialProvider>
      <ProjectionsProvider>
        <YearProjectionProvider>
          <ModalProvider>
            <div>
              <Layout>
                <Home />
              </Layout>
            </div>
          </ModalProvider>
        </YearProjectionProvider>
      </ProjectionsProvider>
    </FinancialProvider>
  );
}

export default App;
