import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import theme from "../theme"
import Header from "./header"
import Footer from "./footer"
import EditionFooter from "./editionFooter"

import styled from '@emotion/styled'
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';

type Children = JSX.Element | JSX.Element[]

interface Props {
  location?: string
  appbar?: JSX.Element
  children?: Children
}

const Main = styled.div(() => ({
  paddingBottom: '1.45rem',
  minHeight: "60vh",
  // "& h2, & h3": {
  // paddingBottom: '0.35rem'
  // },
  "& h2": {
    fontSize: "1.7rem"
    // marginBlockStart: "0.4em",
    // marginBlockEnd: "0.4em",
    // marginTop: "5px",
    // marginRight: "10px",
    // marginBottom: "0.75em",
    // marginLeft: "10px"
  },
  "& h4": {
    marginBlockStart: "0.4em",
    marginBlockEnd: "0.4em"
    },
  "& p": {
  marginBlockStart: "0.4em",
  marginBlockEnd: "0.4em"
  }
  }))

function Layout({ location, appbar, children }: Props): JSX.Element {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          menuLinks {
            en {
              link
              name
            }
            fr {
              link
              name
            }
          }
          customTitle {
            en
            fr
          }
          repository
          version
        }
      }
    }
  `);

  const { repository, customTitle, menuLinks, version } = data.site.siteMetadata

  const title = customTitle

  let footer = <Footer repository={repository} version={version}/>
  if (location?.startsWith("RdC")) {
    footer = <EditionFooter repository={repository}>{footer}</EditionFooter>
  }

  const styles = {
    Body: {
      "&& ::selection": {
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main
      }
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
    backdropText: {
      backgroundColor: '#fff',
      padding: '2em'
    },
    backdropIcon: {
      display: 'block',
      fontSize: "150%"
    }
  };

  const [open, setOpen] = React.useState(true);
  let backdrop: JSX.Element | undefined;

  if (location?.startsWith('synoptic') && useMediaQuery('(max-width:500px)')) {
    backdrop = <Backdrop sx={styles.backdrop} open={open} onClick={() => setOpen(false)}>
      <Typography component="mark" variant="h4" sx={styles.backdropText}>
        <Rotate90DegreesCcwIcon sx={styles.backdropIcon} />
        Rotate your device to a landscape (horizontal) position for the Synoptic view
        <br /><br />
        <em>Tap to dismiss</em>
      </Typography>
    </Backdrop>;
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={styles.Body}>
          <Header
            menuLinks={menuLinks}
            location={location || ''}
            siteTitle={title} />
          {appbar}
          {backdrop}
          <Main className="RdCcontent">
            {children}
          </Main>
          {footer}
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default Layout
