const defaultTheme = {
  typography: {
    fontFamily: [
      'Quicksand',
      'Muli',
      '"Helvetica"',
      'Arial',
      'sans-serif'
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    htmlFontSize: 10,
    body1: {
      fontSize: "1.4rem",
    },
    body2: {
      fontSize: "1.4rem",
    }
  },
  palette: {
    type: "light",
    primary: {
      light: "#FF4D4D",
      main: "#FF3636",
      dark: "#D60909",
      contrastText: "#212121"
    },
    secondary: {
      light: "#c1c1c1",
      main: "#FF9C9C",
      dark: "#181818",
      contrastText: "#FFF"
    }
  }
}

export default defaultTheme