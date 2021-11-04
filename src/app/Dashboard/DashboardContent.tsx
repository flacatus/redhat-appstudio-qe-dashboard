import React from 'react';
import { Tabs, Tab, TabTitleText, TabTitleIcon, GridItem, Gallery, CardTitle, Card, CardBody, DataListItem, DataListContent, Button, DataListAction, DataListItemRow, DataListToggle, DataListItemCells, DataListCell, DataList, Title, DescriptionList, DescriptionListGroup, DescriptionListTerm, DescriptionListTerm, DescriptionListDescription, CardFooter, Divider, Grid } from '@patternfly/react-core';
import UsersIcon from '@patternfly/react-icons/dist/esm/icons/users-icon';
import BoxIcon from '@patternfly/react-icons/dist/esm/icons/box-icon';
import DatabaseIcon from '@patternfly/react-icons/dist/esm/icons/database-icon';
import ServerIcon from '@patternfly/react-icons/dist/esm/icons/server-icon';
import LaptopIcon from '@patternfly/react-icons/dist/esm/icons/laptop-icon';
import { PropertiesSidePanel, PropertyItem } from '@patternfly/react-catalog-view-extension';

import { CodeBranchIcon, DockerIcon, ExternalLinkAltIcon, GitAltIconConfig, GithubAltIcon, GitIcon, GlobeIcon, OkIcon, PlusCircleIcon } from '@patternfly/react-icons';
import axios from 'axios';

export class DashboardContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: 0,
      codeCoverageInformation: [],
      githubRepoInformation: [],
      expanded: [],
    };
    // Toggle currently active tab
    this.handleTabClick = (_event, tabIndex) => {
      this.setState({
        activeTabKey: tabIndex,
      });
    };
  }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async componentDidMount() {
      // GET request using axios with async/await
      const gitHubRepositories = await axios.get("https://api.github.com/orgs/redhat-appstudio/repos");
      this.setState({githubRepoInformation: gitHubRepositories.data})
      const codeCovRepositories = await axios.get("https://codecov.io/api/gh/redhat-appstudio");
      this.setState({codeCoverageInformation: codeCovRepositories.data.repos})
  }

    mountToggle (id) {
      const expanded = this.state.expanded;
      const index = expanded.indexOf(id);
      const newExpanded =
        index >= 0 ? [...expanded.slice(0, index), ...expanded.slice(index + 1, expanded.length)] : [...expanded, id];
      this.setState(() => ({ expanded: newExpanded }));
    }

    getCoverage(repoName) {
      const { codeCoverageInformation } = this.state

      const repo = codeCoverageInformation.find((repo)=> repo.name === repoName)
      if (repo) {
        return repo.coverage
      }
      return null
    }

    render() {
      const { githubRepoInformation, codeCoverageInformation } = this.state
      return (
        <Grid>
            <br />
            <Gallery hasGutter style={{'--pf-l-gallery--GridTemplateColumns--min': '460px', marginLeft: "0.5%", marginRight: "0.5%" }}>
              {githubRepoInformation.map((repository, i) =>
                  <Card style={{display: "flex"}} key = {i}>
                    <CardTitle>
                      <Title headingLevel="h3" size="xl" style={{textAlign : "center"}}>
                        {repository.name}
                      </Title>
                    </CardTitle>
                    <CardBody>
                      <br />
                      <DescriptionList columnModifier={{ lg: '2Col' }}>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Language</DescriptionListTerm>
                          <DescriptionListDescription>{repository.language === null ? "Multiple Languages" : repository.language}</DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Descirption</DescriptionListTerm>
                          <DescriptionListDescription>{repository.description === null ? "Description not provided" : repository.description}</DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Coverage</DescriptionListTerm>
                          <DescriptionListDescription>
                            <a href="#">{this.getCoverage(repository.name) === null ? "Uncovered" : `${this.getCoverage(repository.name)}%`}</a>
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Build Status</DescriptionListTerm>
                          <DescriptionListDescription>
                            <a href="#">Unknown</a>
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Git Url</DescriptionListTerm>
                          <DescriptionListDescription>
                            <a href={repository.html_url}>{repository.html_url}</a>
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      </DescriptionList>
                    </CardBody>
                  </Card>
                )
              }
              </Gallery>
            <br />
        </Grid>
      );
    }
}
