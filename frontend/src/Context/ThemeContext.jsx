import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    defaultTheme: "",
    darkTheme: () => { },
    lightTheme: () => { }
})

export const ThemeContextProvider = ThemeContext.Provider

export const useTheme = () => {
    return useContext(ThemeContext)
}