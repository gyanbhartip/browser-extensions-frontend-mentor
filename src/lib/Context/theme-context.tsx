'use client';

import {
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

export type Theme = 'dark' | 'light' | '';

type ThemeContextType = {
    mode: Theme;
    setMode: Dispatch<SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<Theme>('');

    const localTheme =
        typeof window !== 'undefined' ? localStorage.getItem('theme') : null;

    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        if (localTheme === 'dark' || (!localTheme && prefersDarkMode)) {
            setMode('dark');
            document.documentElement.classList.add('dark');
        } else {
            setMode('light');
            document.documentElement.classList.remove('dark');
        }
    }, [localTheme]);

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
