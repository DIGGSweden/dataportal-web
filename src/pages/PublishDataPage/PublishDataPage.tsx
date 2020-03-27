import { Box, Accordion } from '@digg/design-system';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import 'url-search-params-polyfill';
import { RouterContext } from '../../../shared/RouterContext';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { NoJavaScriptWarning } from '../../components/NoJavaScriptWarning';
import { QueryParamProvider } from '../../components/QueryParamProvider';
import { __RouterContext } from 'react-router';
import { PageMetadata } from '../PageMetadata';
import i18n from 'i18n';

const MainContent = Box.withComponent('main');

export interface PageProps extends RouteComponentProps<any, RouterContext> {}

export class PublishDataPage extends React.Component<PageProps, any> {
  private headerRef: React.RefObject<Header>;

  constructor(props: PageProps) {
    super(props);
    this.headerRef = React.createRef();
    this.setFocus = this.setFocus.bind(this);
    this.state = { activeLink: 'register' };
  }

  setFocus() {
    if (this.headerRef.current) {
      this.headerRef.current.setFocusOnMenuButton();
    }
  }

  setTopMargin(height: number) {
    this.setState({ headerHeight: height });
  }

  render() {
    const { location } = this.props;
    let uri = new URLSearchParams(location.search);

    return (
      <QueryParamProvider params={uri}>
        <PageMetadata
          seoTitle={`${i18n.t('routes|register-data|title')} - ${i18n.t(
            'common|logo-title'
          )}`}
          seoDescription=""
          seoImageUrl=""
          seoKeywords=""
          robotsFollow={true}
          robotsIndex={true}
          lang={i18n.languages[0]}
        />
        <Box
          id="top"
          display="flex"
          direction="column"
          minHeight="100vh"
          bgColor="#fff"
        >
          <NoJavaScriptWarning text="" />

          <Header ref={this.headerRef} activeLink={this.state.activeLink} />

          <ErrorBoundary>
            <MainContent flex="1 1 auto">
              <div className="main-container">
                <h1 className="text-header text-1">Registrera data</h1>
                <div className="content">
                  <p className="preamble text-4">
                    Du har möjlighet att själv bidra med innehåll till Sveriges
                    dataportal genom att publicera dina datamängder. De blir då
                    sökbara för alla och därmed ökar chanserna att de används.
                    Det är först vid användningen av data som nytta uppstår.
                  </p>
                  <p className="main-text text-5">
                    Det ska vara enkelt för användare att hitta och förstå om
                    data passar för de ändamål man har, både innehållsmässigt
                    och tekniskt. Inom kort kommer Sveriges dataportal att
                    innehålla tre olika tjänster och du kan bidra med
                    information till dem alla. Tjänsterna förenklar både för de
                    användare som vill använda data, men även för de aktörer som
                    vill tillgängliggöra information.
                  </p>

                  <ul className="main-text text-5">
                    <li>Sök data</li>
                    <li>Sök begrepp</li>
                    <li>Sök specifikationer</li>
                  </ul>

                  <p className="main-text text-5">
                    Dataportalen möjliggör för ett mer effektivt utbyte av
                    information i ett digital ekosystem genom att länka ihop
                    data med dess specifikation och begrepp.
                  </p>

                  <p className="main-text text-5">
                    Sveriges dataportal tillhandahåller verktyg för att ladda
                    upp innehåll till tjänsterna.
                  </p>

                  <div className="link-blocks">
                    <div
                      className="link-block"
                      onClick={e => {
                        window.location.href = 'https://registrera.oppnadata.se/';
                      }}
                    >
                      <div className="link-wrapper">
                        <a className="" href="https://registrera.oppnadata.se/">
                          Visa din data på Sveriges dataportal
                        </a>
                        <p className="text-5">
                          Registrera din organisation och skördningskälla på
                          Sveriges dataportal. Kontrollera datamängder som
                          skördats och administrera din datakatalog innan
                          publicering.
                        </p>
                      </div>
                    </div>

                    <div
                      className="link-block disabled-linkbox"
                      // onClick={e => {
                      //   window.location.href = `https://editera.dataportal.se/`;
                      // }}
                    >
                      <div className="link-wrapper">
                        <div className="soon">{i18n.t('common|soon')}</div>

                        <a
                          className=""
                          // href="https://editera.dataportal.se/"
                        >
                          Förvalta och begrepp och specifikationer
                        </a>
                        <p className="text-5">
                          Få åtkomst till verktyg där ni kan beskriva,
                          sammanlänka, underhålla och publicera begrepp och
                          specifikationer.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2">
                    {' '}
                    Så här fungerar det att visa din data på dataportalen
                  </h2>
                  <p className="main-text text-5">
                    Sveriges dataportal hämtar dagligen beskrivningar av
                    datamängder som publicerats offentligt av organisationer.
                    Ett annat ord för en beskrivning av en datamängd är
                    metadata. Det är enbart metadatan som publiceras på
                    portalen, medan själva datakällorna finns kvar hos den
                    utgivande organisationen. Både öppna och begränsade data kan
                    beskrivas. Data som får användas av alla ges direktåtkomst
                    via länkar på portalen. Data som har någon form av
                    begränsning efterfrågas eller avtalas åtkomst hos respektive
                    organisation.
                  </p>
                  <p className="main-text text-5">
                    <a
                      href="https://www.europeandataportal.eu/sv/homepage"
                      target="_blank"
                    >
                      Den euoropeiska dataportalen
                    </a>{' '}
                    skördar och visar i sin tur data från Sveriges dataportal.
                  </p>

                  <h2 className="text-2">
                    Så här kommer du igång för att publicera data
                  </h2>
                  <p className="main-text text-5">
                    För att Sveriges dataportal ska veta om vilka data du har
                    måste du publicera en katalog över dina data. I katalogen
                    måste dina data beskrivas som datamängder. En datamängd kan
                    till exempel motsvara de data som lagras i en visst system,
                    data som en viss målgrupp är intresserad av, data som
                    handlar om ett specifikt ämne eller data som förvaltas på
                    ett enhetligt sätt.
                  </p>
                  <p className="main-text text-5">
                    När du har identifierat en eller flera datamängder vars
                    beskrivningar du vill publicera till Sveriges dataportal ska
                    du göra följande:{' '}
                  </p>

                  <ol className="main-text text-5">
                    <li>
                      Beskriv dina datamängder enligt den standardiserade
                      metadataspecifikationen{' '}
                      <a
                        target="_blank"
                        href="https://diggsweden.github.io/DCAT-AP-SE/"
                      >
                        DCAT-AP-SE
                      </a>
                      . Många använder ett externt verktyg för detta steg.
                    </li>
                    <li>
                      Publicera specifikationen på en egen stabil webbadress.
                      Denna webbadress är er så kallade ”skördningskälla” som
                      dataportalen automatiskt hämtar er datakatalog ifrån.
                    </li>
                    <li>
                      Skapa en användare eller logga in på{' '}
                      <a target="_blank"
                        href="https://registrera.oppnadata.se/">
                          registrera.dataportal.se</a>. Sveriges dataportal
                          tillhandahåller verktyg för att validera, slå samman och
                          undersöka din datakatalog innan publicering.
                      </li>
                    <li>
                      Länka upp Sveriges dataportal till er organisations data
                      genom att registrera, ändra och bekräfta er
                      skördningskälla. Validera och spara. Vid behov,
                      kontrollera att skördningen till {' '}
                      <a
                        target="_blank"
                        href="https://registrera.oppnadata.se/"
                      >
                        registrera.dataportal.se
                      </a>{' '}
                      fungerar.
                    </li>
                    <li>
                      När du är klar kommer dina datamängder att dyka upp på
                      Sveriges dataportal.
                    </li>
                  </ol>

                  <p className="main-text text-5">
                    Under utvecklingen av betaversionen av dataportal.se
                    hänvisas publicister till{' '}
                    <a href="https://oppnadata.se" target="_blank">
                      oppnadata.se
                    </a>{' '}
                    för vägledning kring tillgängliggörande av information och
                    publicering av metadata till dataportalen.
                  </p>
                </div>
              </div>
            </MainContent>
          </ErrorBoundary>
          <Footer onToTopButtonPushed={this.setFocus} />
        </Box>
      </QueryParamProvider>
    );
  }
}
