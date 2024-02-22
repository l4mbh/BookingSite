import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage, { loader as AuthenLoader } from "./pages/RootPage";
import HomePage, { loader as HomePageLoader } from "./pages/HomePage";
import Login, { action as ActionLogin } from "./pages/Login";
import UsersPage, { loader as UserListLoader } from "./pages/UsersPage";
import HotelsPage, { loader as HotelListLoader } from "./pages/HotelsPage";
import AddHotelPage, {action as NewHotelAction} from "./pages/AddHotelPage";
import AddRoomPage, {action as NewRoomAction} from "./pages/AddRoomPage";
import RoomsPage, { loader as RoomsListLoader } from "./pages/RoomsPage";
import TransactionsPage, {
  loader as TransactionsListLoader,
} from "./pages/TransactionsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      loader: AuthenLoader,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: HomePageLoader,
        },
        {
          path: "/lists/user",
          element: <UsersPage />,
          loader: UserListLoader,
        },
        {
          path: "/lists/hotel",
          element: <HotelsPage />,
          loader: HotelListLoader,
        },
        {
          path: "/lists/room",
          element: <RoomsPage />,
          loader: RoomsListLoader,
        },
        {
          path: "/lists/transaction",
          element: <TransactionsPage />,
          loader: TransactionsListLoader,
        },
        {
          path: "add-hotel",
          element: <AddHotelPage />,
          action: NewHotelAction
        },
        {
          path: "add-room",
          element: <AddRoomPage />,
          action: NewRoomAction
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      action: ActionLogin,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
