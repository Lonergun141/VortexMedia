import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/authentication/signIn';
import NewsPage from './pages/newsPage/newsPage';
import SignUp from './pages/authentication/signUp';
import ActivateAccount from './pages/authentication/activateAccount';
import ResetPassword from './pages/authentication/resetpassword';
import Resetpasswordchange from './pages/authentication/resetpasswordchange';
import Home from './pages/Home/Home';
import World from './pages/newsPage/world';
import Politics from './pages/newsPage/politics';
import Sports from './pages/newsPage/sports';
import Business from './pages/newsPage/business';
import Entertainment from './pages/newsPage/entertainment';
import Profile from './pages/profile/profile';
import NotFound from './pages/notFound';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <SignIn />,
	},
	{
		path: '/SignUp',
		element: <SignUp />,
	},
	{
		path: '/NewsPage',
		element: <NewsPage />,
	},
	{
		path: '/activate/:uid/:token',
		element: <ActivateAccount />,
	},
	{
		path: '/ResetPass',
		element: <ResetPassword />,
	},
	{
		path: '/password/reset/confirm/:uid/:token',
		element: <Resetpasswordchange />,
	},
	{
		path: '/Home',
		element: <Home />,
	},
	{
		path: '/World',
		element: <World />,
	},
	{
		path: '/Politics',
		element: <Politics />,
	},
	{
		path: '/Sports',
		element: <Sports />,
	},
	{
		path: '/Business',
		element: <Business />,
	},
	{
		path: '/Entertainment',
		element: <Entertainment />,
	},
	{
		path: '/Profile',
		element: <Profile />,
	},
	{
		path: '*',
		element: <NotFound />,
	},


]);
