type RootThemeType = Record<string, { light: string, dark: string }>

const RootTheme: RootThemeType = {
    '--theme-bgc': {
        light: '#e8e8e8',
        dark: '#525252',
    },
    '--theme-bgc-revert': {
        light: '#313131',
        dark: '#e8e8e8',
    },
    '--theme-secondary-bgc': {
        light: 'white',
        dark: '#2a2a2a',
    },
    '--theme-secondary-bgc-revert': {
        light: '#818181',
        dark: '#e5e5e5',
    },
    '--theme-text-color': {
        light: 'black',
        dark: 'white',
    },
    '--theme-text-color-revert': {
        light: 'white',
        dark: 'black',
    },
    '--theme-border-color': {
        light: 'white',
        dark: 'black'
    },
    '--theme-border-color-revert': {
        light: 'black',
        dark: 'white',
    },
    '--theme-dropdown-bgc': {
        light: '#676767',
        dark: '#f5f5f5'
    },
    '--theme-input-icon-color': {
        light: 'invert(0%) sepia(0%) saturate(7%) hue-rotate(253deg) brightness(103%) contrast(100%)',
        dark: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)'
    },
    '--theme-input-placeholder-color': {
        light: '#737373',
        dark: '#c7c7c7'
    }
}

export default RootTheme
