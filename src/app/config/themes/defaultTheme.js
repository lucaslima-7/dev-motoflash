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
      light: "#80AAFF",
      main: "#2E6FF2",
      dark: "#3B6DD4",
      contrastText: "#212121"
    },
    secondary: {
      light: "#c1c1c1",
      main: "#6EFFF3",
      dark: "#181818",
      contrastText: "#212121"
    }
  }
}

export default defaultTheme