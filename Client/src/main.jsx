import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// require('dotenv').config()
import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/Home.jsx";
import PlayQuiz from "./pages/play.jsx";
import AddQuestions from "./pages/addQuestions.jsx";
import MainLayOut from "./components/MainLayOut.jsx";
import EditQuestions from "./pages/Edit.jsx";
import AuthLayOut from "./components/AuthLayOut.jsx";

import Settings from "./pages/settings.jsx";
import { Provider } from "react-redux";
import store from "./slice/store.js";
import QuizAPI from "./pages/playAPI.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<MainLayOut />} />
          <Route element={<AuthLayOut />}>
            <Route path="/" element={<Home />} />

            <Route path="/add" element={<AddQuestions />} />
            <Route path="/play" element={<PlayQuiz />} />
            <Route path="/play/api" element={<QuizAPI/>}/>
            <Route path="/settings" element={<Settings />} />
            <Route path="/edit/:id" element={<EditQuestions />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
