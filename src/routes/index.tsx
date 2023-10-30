import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import HomeScreen from '../containers/home';
import Error404Screen from '../containers/404Page';
import BoardsScreen from '../containers/boards';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeScreen />,
        errorElement: <Error404Screen />,
    },
    {
        path: '/board',
        element: <BoardsScreen />,
        errorElement: <Error404Screen />,
    },
]);

export default router;
