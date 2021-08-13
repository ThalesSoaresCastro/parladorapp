import {
    theme,
    extendTheme,
    withDefaultColorScheme
} from "@chakra-ui/react"


const config:any = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  }

const customTheme = extendTheme({ config })
export default customTheme;