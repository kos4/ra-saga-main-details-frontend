import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainTemplate from "./components/MainTemplate";
import ServicesList from "./components/ServicesList";
import ServicesDetail from "./components/ServicesDetail";

function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <MainTemplate/>,
    children: [
      {
        path: '/',
        exact: true,
        element: <ServicesList/>,
      },
      {
        path: '/:id/details',
        element: <ServicesDetail/>,
      },
    ]
  }]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
