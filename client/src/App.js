import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import { default as Search, action as SearchAction} from "./pages/search/Search";
import { LoginPage } from "./pages/user/login";
import { SignupPage, action as SignupAction } from "./pages/user/singup";
import { Provider } from "react-redux";
import store from "./store/index";
import TransactionPage from "./pages/transactions/Transaction";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search",
      element: <Search />,
      action: SearchAction
    },
    {
      path: "/detail/:id",
      element: <Detail />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
      action: SignupAction,
    },
    {
      path: '/user',
      children: [
        {
          path: 'transaction',
          element: <TransactionPage/>
        }
      ]
    }
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
