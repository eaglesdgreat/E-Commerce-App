import { createMuiTheme } from '@material-ui/core/styles'
import {
  blue,
  red,
  purple,
  orange,
} from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: orange['600'],
      main: orange['400'],
      // dark: lightGreen['A200'],
    },
    secondary: {
      // light: green['A100'],
      main: purple['600'],
      // dark: purple['A200'],
    },
    contrastThreshold: 4,
    tonalOffset: 0.3,
    openTitle: blue['900'],
    protectedTitle: red['800'],
    type: 'light',
  },
})

export default theme
