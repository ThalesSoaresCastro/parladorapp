import {
    theme,
    extendTheme,
    withDefaultColorScheme
} from "@chakra-ui/react"


const config:any = {
    initialColorMode: "dark",
    useSystemColorMode: false,
    fonts:{
      body:'Roboto, system-ui, sans-serif',
      heding:'Roboto, system-ui, sans-serif',
      mono:'Menlo, monospace',
    },
    fontWeights:{
      ...theme.fontWeights,
      normal:400,
      medium: 600,
      bold:700
    },
    radii:{
      ...theme.radii,
      sm:'5px',
      md:'8px',
    },
    fontSizes:{
      ...theme.fontSizes,
      '6xl':'54px'
    },
    colors:{
      ...theme.colors,
      gray:{
        ...theme.colors.gray,
        300:'#e1e1e6',
        600:'#29292e',
        700:'#202024',
        800:'#121214',
      },
    }
  }

const customTheme = extendTheme({ config })
export default customTheme;