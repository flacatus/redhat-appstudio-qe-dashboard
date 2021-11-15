import React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  Gallery,
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  Title,
  DescriptionList, DescriptionListGroup, DescriptionListTerm, DescriptionListDescription
} from '@patternfly/react-core';
import { DashboardContent } from './DashboardContent';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import axios from 'axios';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboardVersion: 'Unknown'
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async componentDidMount() {
    const { data: backendInfo } = await axios.get("http://127.0.0.1:9898/version");
    this.setState( { dashboardVersion: backendInfo.version } )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { dashboardVersion } = this.state;

    return (
      <React.Fragment>
          <PageSection style={{
            minHeight : "12%",
            background:"url(https://console.redhat.com/apps/frontend-assets/background-images/new-landing-page/estate_section_banner.svg)",
            backgroundSize: "cover",
            backgroundColor : "black",
            opacity: '0.9'
          }} variant={PageSectionVariants.light}>
            <TextContent style={{color: "white"}}>
              <Text component="h2">Red Hat App Studio Quality Dashboard</Text>
              <Text component="p">This is a demo that show app studio quality status.</Text>
            </TextContent>
          </PageSection>
            <PageSection >
            <Gallery hasGutter style={{ display:"flex" }}>
              <Card style={{width: "35%"}}>
                <CardTitle>
                  <Title headingLevel="h1" size="-xl">
                    Red Hat App Studio Details
                  </Title>
                </CardTitle>
                <CardBody>
                  <DescriptionList>
                  <DescriptionListGroup>
                      <DescriptionListTerm>Quality Dashboard version</DescriptionListTerm>
                      <DescriptionListDescription>
                        <span>{dashboardVersion}</span>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Staging Version</DescriptionListTerm>
                      <DescriptionListDescription>
                        <span>Unknown Version</span>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Production Version</DescriptionListTerm>
                      <DescriptionListDescription>Unknown Version</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Github Organization</DescriptionListTerm>
                      <a href="https://github.com/redhat-appstudio">redhat-appstudio <ExternalLinkAltIcon ></ExternalLinkAltIcon></a>
                    </DescriptionListGroup>
                  </DescriptionList>
                </CardBody>
              </Card>
              <Card style={{width: "65%"}}>
                <CardTitle>
                  <Title headingLevel="h2" size="xl">
                    Tests Summary
                  </Title>
                </CardTitle>
              </Card>
            </Gallery>
            </PageSection>
          <DashboardContent/>
      </React.Fragment>
    );
  }
}
