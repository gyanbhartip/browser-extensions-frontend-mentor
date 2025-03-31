import { useEffect } from 'react';
import './App.css';
import Header from './components/header';
import List from './components/list';
import { useAppDispatch } from './lib/Redux';
import { fetchExtensions } from './lib/Redux/extension-slice';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            fetchExtensions({
                uri: './assets/data.json',
            }),
        );
    }, [dispatch]);

    return (
        <div className="flex flex-col py-12 max-w-7xl mx-auto">
            <Header />
            <List />
        </div>
    );
}

export default App;
