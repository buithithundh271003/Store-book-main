import { Routes, Route } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./routes"
import AdminLayout from "./layout/adminLayout"
import BaseLayout from "./layout/baseLayout";

function App() {
  return (
    <Routes>
      {/* Client */}
      {publicRoutes?.map((route, index) => {
        const Page = route.Component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <BaseLayout>
                <Page />
              </BaseLayout>
            }
          />
        );
      })}

      {/* Admin */}
      {privateRoutes?.map((route, index) => {
        const Page = route.Component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <AdminLayout>
                <Page />
              </AdminLayout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App
