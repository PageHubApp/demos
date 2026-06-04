import ReactDOM from "react-dom/client";
import App from "./App";

// NOTE: No <React.StrictMode> — it double-invokes effects in dev, which would
// init() the editor twice into the same container.
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
