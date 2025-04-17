import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import TrainList from './components/train-list/TrainList';
import ProtectedRoute from './routes/ProtectedRoute';
import TrainFormWrapper from './components/train-form/TrainFormWrapper';
import NotFoundPage from './components/ErrorComponent';

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />}/>
                    <Route path="/register" element={<RegisterForm/>} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/trains" element={<TrainList/>} />
                        <Route path="/trains/:id/edit" element={<TrainFormWrapper/>} />
                        <Route path="/trains/new" element={<TrainFormWrapper/>} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
    );

}

export default App;
