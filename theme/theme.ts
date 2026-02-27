"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  cssVariables: true,
  colorSchemes: { light: true },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily:
      'var(--font-inter), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: { fontWeight: 950, letterSpacing: -1.2 },
    h2: { fontWeight: 950, letterSpacing: -1.0 },
    h3: { fontWeight: 950, letterSpacing: -0.8 },
    h4: { fontWeight: 900, letterSpacing: -0.5 },
    h5: { fontWeight: 900, letterSpacing: -0.3 },
    h6: { fontWeight: 900, letterSpacing: -0.2 },
    button: { fontWeight: 800, letterSpacing: -0.1, textTransform: "none" }
  },
  palette: {
    mode: "light",
    primary: { main: "#1f4d7a" }, // arctic blue
    secondary: { main: "#8a5a2b" },
    background: {
      default: "#f8fafc",
      paper: "#ffffff"
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569"
    },
    divider: "rgba(15,23,42,0.10)"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(1200px 600px at 10% 0%, rgba(31,77,122,0.10), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(138,90,43,0.08), transparent 55%), linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #f8fafc 100%)"
        }
      }
    },
    MuiContainer: {
      defaultProps: { maxWidth: "lg" }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.78)",
          backdropFilter: "saturate(180%) blur(10px)"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
          borderRadius: 18,
          overflow: "hidden"
        }
      }
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999
        },
        contained: {
          boxShadow: "0 10px 24px rgba(31,77,122,0.22)"
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700
        }
      }
    },
    MuiLink: {
      defaultProps: { underline: "hover" }
    }
  }
});

theme = responsiveFontSizes(theme);
export default theme;