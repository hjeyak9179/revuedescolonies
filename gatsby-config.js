const basePath = process.env.BASEPATH
const customTitle = {
  en: "The Revue des Colonies: a Digital Scholarly Edition and Translation",
  fr: "La Revue des Colonies: Édition bilingue annotée"
}
const htmlTitle = {
  en: "The <em>Revue des Colonies</em>: a Digital Scholarly Edition and Translation",
  fr: "La <em>Revue des Colonies</em>: Édition bilingue annotée"
}
const {addPtrNumbers, xinclude} = require('./scripts/transformers')

module.exports = {
  pathPrefix: basePath,
  siteMetadata: {
    customTitle,
    htmlTitle,
    desc: {
      en: `${customTitle.en}. Edited by Maria Beliaeva Solomon.`,
      fr: `${customTitle.fr}. ... Maria Beliaeva Solomon.`
    },
    authors: [
      {
        "first": "Maria",
        "middle": "",
        "last": "Beliaeva Solomon",
        "affiliations": [
          "University of Maryland"
        ],
        orcid:"0000-0000-0000-0000"
      },
      {
        "first": "Raffaele",
        "middle": "",
        "last": "Viglianti",
        "affiliations": [
          "University of Maryland"
        ],
        orcid:"0000-0000-0000-0000"
      }
    ],
    repository: "https://github.com/revuedescolonies/revuedescolonies",
    menuLinks: [
      {
        en: {
          name: 'home',
          link: '/'
        },
        fr: {
          name: 'accueil',
          link: '/fr/'
        }
      },
      {
        en: {
          name: 'about',
          link: '/en/about/'
        },
        fr: {
          name: 'à propos',
          link: '/fr/àpropos/'
        }
      },
      {
        en: {
          name: 'people',
          link: '/en/people/'
        },
        fr: {
          name: 'équipe',
          link: '/fr/équipe/'
        }
      },
      {
        en: {
          name: 'edition',
          link: '/en/toc/'
        },
        fr: {
          name: 'édition',
          link: '/fr/sommaire/'
        }
      },
      {
        en: {
          name: 'search',
          link: '/en/search/'
        },
        fr: {
          name: 'récherche',
          link: '/fr/récherche/'
        }
      },
      {
        en: {
          name: 'index',
          link: '/en/index'
        },
        fr:{
          name:'index',
          link:'/fr/index'
        }
      }
    ]
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-material-ui`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-38Y0J0NHJY"
        ],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true
        },
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
      },
    },
    {
      resolve: `gatsby-theme-ceteicean`,
      options: {
        fullShadow: true,
        applyBefore: [addPtrNumbers, xinclude],
        applyAfter: [],
        namespaces: {
          "http://www.tei-c.org/ns/1.0": "tei",
          "http://www.tei-c.org/ns/Examples": "teieg",
          "http://www.w3.org/2001/XInclude": "xi"
        }
      }
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `static/data/tei`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/contents/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `edition`,
        path: `${__dirname}/src/contents/edition`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 5000,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Revue des Colonies`,
        short_name: `Revue des Colonies`,
        start_url: `/`,
        icon: `src/images/RdC-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
