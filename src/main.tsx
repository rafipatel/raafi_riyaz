import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { startLiveFavicon } from "./lib/liveFavicon";

createRoot(document.getElementById("root")!).render(<App />);
startLiveFavicon();
