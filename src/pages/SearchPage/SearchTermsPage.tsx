import {
  Box,
} from '@digg/design-system';
import React from 'react';
import 'url-search-params-polyfill';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { NoJavaScriptWarning } from '../../components/NoJavaScriptWarning';
import { QueryParamProvider } from '../../components/QueryParamProvider';
import { __RouterContext } from 'react-router';
import {
  SearchContext,
  SearchProvider,
} from '../../components/Search';
import { decode } from 'qss';
import { PageMetadata } from '../PageMetadata';
import { SearchHeader } from 'components/SearchHead';
import { ESRdfType, ESType } from 'components/Search/EntryScape';
import i18n from 'i18n';
import { PageProps } from '../PageProps';
import { StaticBreadcrumb } from 'components/Breadcrumb';
import SearchFilters from './SearchFilters';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

const MainContent = Box.withComponent('main');

interface SearchProps extends PageProps {
  activeLink?: string;
}

export class SearchTermsPage extends React.Component<SearchProps, any> {
  private headerRef: React.RefObject<Header>;

  constructor(props: SearchProps) {
    super(props);
    this.headerRef = React.createRef();
    this.setFocus = this.setFocus.bind(this);
    this.state = { query: '*', activeLink: 'search', showFilters: false };
    this.state = { activeLink: 'terms' };
  }

  setFocus() {
    if (this.headerRef.current) {
      this.headerRef.current.setFocusOnMenuButton();
    }
  }

  setTopMargin(height: number) {
    this.setState({ headerHeight: height });
  }

  componentDidMount() {
    //needed for handling back/forward buttons and changing state for input correctly
    if (typeof window !== 'undefined') {
      //handles back/forward button
      window.addEventListener('popstate', () => {
        var qs = decode(window.location.search.substring(1)) as any;
        let querytext =
          qs.q && qs.q.toString().length > 0 ? qs.q.toString() : '';

        if (querytext) this.setState({ query: querytext });
      });

      //*** makes sure querytext is set from location to input, on page reloads
      var qs = decode(window.location.search.substring(1)) as any;
      let querytext = qs.q && qs.q.toString().length > 0 ? qs.q.toString() : '';

      if (querytext)
        this.setState({
          query: decodeURIComponent(querytext.replace(/\+/g, '%20')),
        });

      //***

      //Scroll to top on pagination click.
      // window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  setQuery = (value: string) => {
    this.setState({
      query: value,
    });
  };

  toggleShowOrHide = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  pathResover = (hitMeta: any) => {
    var resourceUri = hitMeta.getResourceURI();

    var path = '';

    if (resourceUri.indexOf('://') > -1) {
      var tmp = resourceUri.split("://");
      path = tmp[0] + '/' + tmp[1];
    }
    else
      path = resourceUri;

    if (resourceUri && !resourceUri.includes('dataportal.se'))
      return `/${i18n.languages[0]}/externalconcepts/${path}`;
    else
    {
      //NDP-343
      if(path.startsWith("https/dataportal.se/concepts"))
        path = path.replace("https/dataportal.se/concepts","");    

      return `/${i18n.languages[0]}/concepts${path}`;
    }
  };

  render() {
    const { location } = this.props;
    let uri = new URLSearchParams(location.search);

    return (
      <QueryParamProvider params={uri}>
        <SearchProvider
          entryscapeUrl={this.props.env.ENTRYSCAPE_TERMS_PATH ? `https://${this.props.env.ENTRYSCAPE_TERMS_PATH}/store` : 'https://editera.dataportal.se/store'}
          hitSpecifications={{
            "http\://www.w3.org/2004/02/skos/core#Concept":
            {
              path: `/${i18n.languages[0]}/concepts/`,
              titleResource: 'http://www.w3.org/2004/02/skos/core#prefLabel',
              descriptionResource: 'http://www.w3.org/2004/02/skos/core#definition',
              pathResolver: this.pathResover
            }
          }}
          facetSpecification={{
            facets: [
              {
                resource: 'http://www.w3.org/2004/02/skos/core#inScheme',
                type: ESType.uri,
              },
            ],
          }}
          initRequest={{
            esRdfTypes: [ESRdfType.term],
            language: i18n.languages[0],
            takeFacets: 30,
          }}
        >
          <PageMetadata
            seoTitle={`${i18n.t('routes|concepts|title')} - ${i18n.t(
              'common|logo-title'
            )}`}
            seoDescription=""
            seoImageUrl=""
            seoKeywords=""
            robotsFollow={true}
            robotsIndex={true}
            lang={i18n.languages[0]}
            socialMeta={{
              socialDescription : i18n.t('pages|specifications|social_meta_description'),
              socialTitle : i18n.t('pages|specifications|social_meta_title'),
              socialUrl : `${this.props.env.CANONICAL_URL}/${i18n.languages[0]}/${i18n.t('routes|specifications|path')}`
            }}
          />
          <Box
            id="top"
            display="flex"
            direction="column"
            minHeight="100vh"
            bgColor="#fff"
          >
            <NoJavaScriptWarning text="" />

            <Header ref={this.headerRef} activeLink={this.state.activeLink} env={this.props.env} />

            <ErrorBoundary>
              <MainContent id="main" flex="1 1 auto">
                <StaticBreadcrumb
                  env={this.props.env}
                  staticPaths={[
                    {
                      path: `/${i18n.languages[0]}/${i18n.t(
                        'routes|concepts|path'
                      )}`,
                      title: i18n.t('routes|concepts|title'),
                    },
                  ]}
                />
                <SearchContext.Consumer>
                  {(search) => (
                    <div className="wpb_wrapper">
                      <div className="main-container">
                        <SearchHeader
                          ref={this.headerRef}
                          activeLink={this.state.activeLink}
                        />

                        <div className="row">
                          <h1 className="text-2 search-header">
                            {i18n.t('common|search-concept')}
                          </h1>
                          <span className="text-6-bold beta_badge--lg">
                            BETA
                          </span>
                        </div>

                        <SearchInput search={search} searchType="begrepp" query={this.state.query} setQuery={this.setQuery} />

                        <div className="mobile-filters">
                          <button
                            className={
                              this.state.showFilter ? 'filter-active' : ''
                            }
                            onClick={this.toggleShowOrHide}
                          >
                            {this.state.showFilter
                              ? `${i18n.t('common|hide-filter')}`
                              : `${i18n.t('common|show-filter')}`}
                          </button>
                        </div>

                        <SearchFilters showFilter={this.state.showFilter} search={search} searchType="begrepp" query={this.state.query} />

                        <noscript>{i18n.t('common|search-datasets')}</noscript>

                        <SearchResults search={search} searchType="begrepp" />

                      </div>
                    </div>
                  )}
                </SearchContext.Consumer>
              </MainContent>
            </ErrorBoundary>
            <Footer onToTopButtonPushed={this.setFocus} />
          </Box>
        </SearchProvider>
      </QueryParamProvider>
    );
  }
}
