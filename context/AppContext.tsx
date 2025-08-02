import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  isLoading: boolean;
  theme: 'light' | 'dark';
}

interface AppContextType {
  state: AppState;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    theme: 'light',
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const setTheme = (theme: 'light' | 'dark') => {
    setState(prev => ({ ...prev, theme }));
  };

  return (
    <AppContext.Provider value={{ state, setLoading, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};
