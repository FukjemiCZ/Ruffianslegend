"use client";

import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import NextLink from "@/components/NextLink";

const NAV = [
  { label: "O nás", href: "/o-nas" },
  { label: "Naše hodnoty", href: "/nase-hodnoty" },
  { label: "Psi", href: "/psi" },
  { label: "Vrh", href: "/vrhy" },
  { label: "Štěňata", href: "/stenata" },
  { label: "Galerie", href: "/galerie" },
  { label: "Podporují nás", href: "/podporuji-nas" },
  { label: "Kontakt", href: "/kontakt" }
];

export default function AppHeader({ siteName }: { siteName: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AppBar position="sticky" elevation={0} color="inherit" sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        <Container>
          <Toolbar disableGutters sx={{ minHeight: 64, gap: 1 }}>
            {isMobile ? (
              <>
                <IconButton aria-label="Menu" onClick={() => setOpen(true)}>
                  <MenuIcon />
                </IconButton>

                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography
                    component={NextLink}
                    href="/"
                    variant="h6"
                    sx={{ textDecoration: "none", color: "inherit", fontWeight: 900, letterSpacing: -0.5 }}
                  >
                    {siteName}
                  </Typography>
                </Box>

                <Button
                  component={NextLink}
                  href="/stenata/prihlaska"
                  variant="contained"
                  sx={{ borderRadius: 999 }}
                >
                  Rezervace
                </Button>
              </>
            ) : (
              <>
                <Typography
                  component={NextLink}
                  href="/"
                  variant="h6"
                  sx={{ textDecoration: "none", color: "inherit", fontWeight: 900, letterSpacing: -0.5, mr: 2 }}
                >
                  {siteName}
                </Typography>

                <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                  {NAV.map((item) => {
                    const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                    return (
                      <Button
                        key={item.href}
                        component={NextLink}
                        href={item.href}
                        color={active ? "primary" : "inherit"}
                        sx={{ fontWeight: active ? 800 : 500 }}
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                </Box>

                <Button component={NextLink} href="/stenata/prihlaska" variant="contained" sx={{ borderRadius: 999 }}>
                  Rezervace
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, p: 1 }}>
          <Typography sx={{ px: 1.5, py: 1, fontWeight: 900 }}>{siteName}</Typography>
          <List>
            {NAV.map((item) => (
              <ListItemButton
                key={item.href}
                component={NextLink as any}
                href={item.href}
                onClick={() => setOpen(false)}
                selected={pathname === item.href}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ p: 1 }}>
            <Button
              fullWidth
              component={NextLink}
              href="/stenata/prihlaska"
              variant="contained"
              sx={{ borderRadius: 999 }}
              onClick={() => setOpen(false)}
            >
              Rezervace
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
