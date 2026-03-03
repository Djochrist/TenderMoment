import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/experience" component={Experience} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "rgba(20, 20, 25, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: "16px",
            },
          }}
        />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
