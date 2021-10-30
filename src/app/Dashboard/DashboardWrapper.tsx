import React from 'react';
import {
  Page,
  SkipToContent
} from '@patternfly/react-core';
import DashboardHeader from './DashboardHeader';

export default class DashboardWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0
    };

    this.onNavSelect = result => {
      this.setState({
        activeItem: result.itemId
      });
    };
  }

  render() {
    const {
      children,
      mainContainerId,
      onPageResize,
    } = this.props;

    let renderedBreadcrumb;

    const PageSkipToContent = (
      <SkipToContent href={`#${mainContainerId ? mainContainerId : 'main-content-page-layout-default-nav'}`}>
        Skip to content
      </SkipToContent>
    );

    return (
      <Page
        isManagedSidebar
        skipToContent={PageSkipToContent}
        breadcrumb={renderedBreadcrumb}
        mainContainerId={mainContainerId ? mainContainerId : 'main-content-page-layout-default-nav'}
        onPageResize={onPageResize}
      >
        {children}
      </Page>
    );
  }
}
