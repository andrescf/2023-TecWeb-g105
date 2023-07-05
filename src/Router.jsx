import { createBrowserRouter,
    RouterProvider,
    redirect
} from "react-router-dom";

import Layout from './pages/Layout';
import AboutUs from './pages/AboutUs/AboutUs'
import LandingPage from './pages/LandingPage/LandingPage';
import Rules from './pages/Rules/Rules';
import CreateUser from './pages/CreateUser/CreateUser';
import SignIn from './pages/SignIn/SignIn';
import EdifActions from "./pages/Actions/EdifActions";
import NPCActions from "./pages/Actions/NPCActions";
import SGajardo from "./pages/Creators/SGajardo";
import ACatalan from "./pages/Creators/ACatalan";
import Creators from "./pages/Creators/Creators";
import MainPage from "./pages/MainPage/MainPage";
import GamesList from "./pages/Game/GamesList";
import GameLobby from "./pages/Game/GameLobby";
import Game from "./pages/Game/Game";

function Router() {
    const router = createBrowserRouter([
        {
            path:'/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <LandingPage />,
                },
                {
                    path: 'about-us',
                    element: <AboutUs />,
                },
                {
                    path: 'rules',
                    element: <Rules />
                },
                {
                    path: 'create-user',
                    element: <CreateUser />
                },
                {
                    path: 'sign-in',
                    element: <SignIn />
                },
                {
                    path: 'edif-action',
                    element: <EdifActions />
                },
                {
                    path: 'npc-action',
                    element: <NPCActions />
                },
                {
                    path: 'catalan',
                    element: <ACatalan />
                },
                {
                    path: 'gajardo',
                    element: <SGajardo />
                },
                {
                    path: 'creadores',
                    element: <Creators />
                },
                {
                    path: 'main-page',
                    element: <MainPage />
                },
                {
                    path: 'games-list',
                    element: <GamesList />
                },
                {
                    path: 'game-lobby',
                    element: <GameLobby />
                },
                {
                    path: 'game',
                    element: <Game />
                }
            ]
        },
        {
            path: '*',
            loader: () => {
                return redirect('/')
            }
        }
    ])

    return (
        <RouterProvider router={router} />
    );
}

export default Router;