import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';
import AppLayout from './components/AppLayout.jsx';
import Feed from './pages/Feed'; // Your feed page
import Profile from './pages/Profile'; // Your profile page
import Login from './pages/Login.jsx'; // Your login page
import Register from './pages/Register';
import CreatePost from "./pages/CreatePost.jsx";
import Posts from "./pages/Posts.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import PaymentPageWrapper from "./components/PaymentPageWrapper.jsx";


const App = () => {
    return (
        <>
            <Router>
                <AppLayout>
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/feeds" element={<Feed />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/post-details/:postId" element={<PostDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/payments" element={<PaymentPageWrapper />} />
                    </Routes>
                </AppLayout>
            </Router>

            <Toaster />
        </>
    );
};

export default App;
