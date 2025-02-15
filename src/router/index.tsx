import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  import App from "../App";
import { Archive, Banks, Home } from "../modules";
  const Index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
          <Route index element={<Home/>}/>
          <Route path="banks" element={<Banks/>}/>
          <Route path="archive" element={<Archive/>}/>
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
  };
  
  export default Index;
  