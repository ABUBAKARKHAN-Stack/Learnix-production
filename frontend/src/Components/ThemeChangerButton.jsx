import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../Context/ThemeContext'

function ThemeChangerButton() {

    const { lightTheme, darkTheme, defaultTheme } = useTheme()

    const handleThemeSwitch = () => {
        const htmlTag = document.querySelector('html')
        if (htmlTag.classList.contains('light')) {
            darkTheme()
        } else {
            lightTheme()
        }
    }

    return (
        <button
            title={`Switch to ${defaultTheme === "light" ? "Dark" : "Light"} Mode!`}
            onClick={handleThemeSwitch} className={`w-8 ${defaultTheme === 'light' ? 'bg-black text-slate-50 ' : 'bg-slate-50 text-black'} hover:scale-110 fixed flex justify-center items-center transition-all bottom-[6%]  h-8 rounded-r-full`}>
            {defaultTheme === 'light' ? <FiMoon /> : <FiMoon size={18} />}
        </button>
    )
}

export default ThemeChangerButton