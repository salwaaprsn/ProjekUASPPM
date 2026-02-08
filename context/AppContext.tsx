import * as SQLite from 'expo-sqlite';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { LanguageCode, TranslationKey, translations } from '../constants/translations';

type Theme = 'light' | 'dark';

interface AppContextType {
    theme: Theme;
    language: LanguageCode;
    isGuest: boolean;
    isLoggedIn: boolean;
    toggleTheme: () => void;
    setLanguage: (lang: LanguageCode) => void;
    setIsGuest: (val: boolean) => void;
    setIsLoggedIn: (val: boolean) => void;
    t: (key: TranslationKey) => string;
    colors: any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const db = SQLite.openDatabaseSync('antigravity.db');

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [language, setLanguageState] = useState<LanguageCode>('id');
    const [isGuest, setIsGuest] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Initialize settings table and load values
        db.execSync(`
          CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY NOT NULL, 
            username TEXT, email TEXT, tanggal_lahir TEXT, 
            jenis_kelamin TEXT, no_telepon TEXT, member_sejak TEXT
          );
          CREATE TABLE IF NOT EXISTS addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            label TEXT NOT NULL,
            details TEXT NOT NULL,
            recipient_name TEXT NOT NULL,
            phone_number TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS payment_methods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            provider TEXT,
            account_number TEXT,
            is_linked INTEGER DEFAULT 1
          );
        `);

        try {
            const themeRes = db.getFirstSync<{ value: string }>('SELECT value FROM settings WHERE key = ?', ['theme']);
            if (themeRes) setTheme(themeRes.value as Theme);

            const langRes = db.getFirstSync<{ value: string }>('SELECT value FROM settings WHERE key = ?', ['language']);
            if (langRes) setLanguageState(langRes.value as LanguageCode);
        } catch (error) {
            console.error("Error loading settings:", error);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        db.runSync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['theme', newTheme]);
    };

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        db.runSync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['language', lang]);
    };

    const t = (key: TranslationKey): string => {
        return translations[language][key] || key;
    };

    const colors = {
        background: theme === 'light' ? '#FAFAFA' : '#121212',
        card: theme === 'light' ? '#FFFFFF' : '#1E1E1E',
        text: theme === 'light' ? '#333333' : '#F5F5F5',
        textSecondary: theme === 'light' ? '#999999' : '#AAAAAA',
        primary: '#4B2C0A', // FieldCoffee Brown
        accent: '#8B5A2B',
        border: theme === 'light' ? '#F0F0F0' : '#333333',
        header: theme === 'light' ? '#FFFFFF' : '#1A1A1A',
    };

    return (
        <AppContext.Provider value={{
            theme,
            language,
            isGuest,
            isLoggedIn,
            toggleTheme,
            setLanguage,
            setIsGuest,
            setIsLoggedIn,
            t,
            colors
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};
