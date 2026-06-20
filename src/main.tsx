
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import { VitalsProvider } from "./lib/vitals.tsx";
  import { ThemeProvider } from "./lib/theme.tsx";
  import { NavProvider } from "./lib/nav.tsx";
  import { ProfileProvider } from "./lib/profileStore.tsx";
  import "./index.css";
  import "./styles/design-system.css";

  createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
      <VitalsProvider>
        <ProfileProvider>
          <NavProvider>
            <App />
          </NavProvider>
        </ProfileProvider>
      </VitalsProvider>
    </ThemeProvider>
  );
