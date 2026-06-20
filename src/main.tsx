
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import { VitalsProvider } from "./lib/vitals.tsx";
  import { ThemeProvider } from "./lib/theme.tsx";
  import "./index.css";
  import "./styles/design-system.css";

  createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
      <VitalsProvider>
        <App />
      </VitalsProvider>
    </ThemeProvider>
  );
