import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout /MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Communities from "./pages/Communities.jsx";
import Community from "./pages/Community.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="posts/:id" element={<Post />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="communities" element={<Communities />} />
          <Route path="communities/:name" element={<Community />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;