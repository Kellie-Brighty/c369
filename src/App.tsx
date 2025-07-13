import { Outlet } from "react-router-dom";
import DesktopView from "./components/DesktopView";
import MobileView from "./components/MobileView";
import { InstallPWA } from "./components/InstallPWA";
import useViewport from "./hooks/useViewport";

function App() {
  const { width } = useViewport();
  const breakpoint = 768;

  const MobileLayout = () => (
    <div className="flex flex-col min-h-screen relative">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <MobileView />
      <InstallPWA />
      </div>
  );

  return width < breakpoint ? <MobileLayout /> : <DesktopView />;
}

export default App;
