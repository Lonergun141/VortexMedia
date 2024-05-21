import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/authentication/signIn';
import NewsPage from './pages/newsPage/newsPage';
import SignUp from './pages/authentication/signUp';
import ActivateAccount from './pages/authentication/activateAccount';
import ResetPassword from './pages/authentication/resetpassword';
import Resetpasswordchange from './pages/authentication/resetpasswordchange';
import World from './pages/newsPage/world';
import Politics from './pages/newsPage/politics';
import Sports from './pages/newsPage/sports';
import Business from './pages/newsPage/business';
import Entertainment from './pages/newsPage/entertainment';
import Profile from './pages/profile/profile';
import NotFound from './pages/notFound';

export const router = createBrowserRouter([
	{
		path: '/VortexMedia',
		element: <SignIn />,
	},
	{
		path: '/VortexMedia/SignUp',
		element: <SignUp />,
	},
	{
		path: '/VortexMedia/NewsPage',
		element: <NewsPage />,
	},
	{
		path: '/VortexMedia/activate/:uid/:token',
		element: <ActivateAccount />,
	},
	{
		path: '/VortexMedia/ResetPass',
		element: <ResetPassword />,
	},
	{
		path: '/VortexMedia/password/reset/confirm/:uid/:token',
		element: <Resetpasswordchange />,
	},
	{
		path: '/VortexMedia/World',
		element: <World />,
	},
	{
		path: '/VortexMedia/Politics',
		element: <Politics />,
	},
	{
		path: '/VortexMedia/Sports',
		element: <Sports />,
	},
	{
		path: '/VortexMedia/Business',
		element: <Business />,
	},
	{
		path: '/VortexMedia/Entertainment',
		element: <Entertainment />,
	},
	{
		path: '/VortexMedia/Profile',
		element: <Profile />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);
