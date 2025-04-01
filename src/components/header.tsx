import { useCallback } from 'react';
import { useTheme } from '../lib/Context/theme-context';

const Header = () => {
    const { mode, setMode } = useTheme();

    const themeIcon =
        mode === 'dark'
            ? '/assets/icons/icon-moon.svg'
            : '/assets/icons/icon-sun.svg';

    const onThemeSwitch = useCallback(() => {
        try {
            setMode(_t => {
                if (_t === 'dark') {
                    localStorage.setItem('theme', 'light');
                    return 'light';
                }
                localStorage.setItem('theme', 'dark');
                return 'dark';
            });
        } catch (error) {
            console.error('Error in setting theme: ', error);
        }
    }, [setMode]);

    return (
        <header className="bg-dark-gray-400 mb-12 flex items-center justify-between rounded-2xl px-3 py-3">
            <div className="flex items-center justify-between gap-4">
                <img src="/assets/icons/logo.svg" alt="logo" />
                <span className="text-xl font-bold">Extensions</span>
            </div>
            <button
                onClick={onThemeSwitch}
                type="button"
                className="bg-dark-gray-300 flex h-10 w-10 items-center justify-center rounded-xl">
                <img alt="dark/light mode switch" src={themeIcon} />
            </button>
        </header>
    );
};

export default Header;
