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
import { TopImage } from 'assets/TopImage';
import { string } from 'prop-types';
import { NewsItem } from '../../components/News'
import { SettingsContext } from 'components/SettingsProvider';

const MainContent = Box.withComponent('main');

export interface NewsPageProps
  extends RouteComponentProps<any, RouterContext> {}

export class NewsPage extends React.Component<NewsPageProps> {
  private headerRef: React.RefObject<Header>;

  constructor(props: NewsPageProps) {
    super(props);
    this.headerRef = React.createRef();
    this.setFocus = this.setFocus.bind(this);
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
          seoTitle="Nyheter - Sveriges dataportal"
          seoDescription=""
          seoImageUrl=""
          seoKeywords=""
          robotsFollow={true}
          robotsIndex={true}
          lang={i18n.languages[0]}
        />
        <SettingsContext.Consumer>
          {settings => (       
          <Box
            id="top"
            display="flex"
            direction="column"
            minHeight="100vh"
            bgColor="#fff"
          >
            <NoJavaScriptWarning text="" />

            <Header ref={this.headerRef} />

            <ErrorBoundary>
              <MainContent flex="1 1 auto">
                <div className="main-container">                  
                  <div className="">
                  <NewsItem env={settings.env} id={this.props.match.params.nid} />
                  </div>
                </div>
              </MainContent>
            </ErrorBoundary>
            <Footer onToTopButtonPushed={this.setFocus} />
          </Box>
          )}
        </SettingsContext.Consumer>
      </QueryParamProvider>
    );
  }
}
