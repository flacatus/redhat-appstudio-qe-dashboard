import React from 'react';
import {
  Button,
  DataList,
  DataListItem,
  DataListItemRow,
  DataListCell,
  DataListAction,
  DataListToggle,
  DataListContent,
  DataListItemCells,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  KebabToggle,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  ToolbarExpandIconWrapper,
  ToolbarContent,
  InputGroup,
  TextInput,
  ButtonVariant,
  Alert,
  Tooltip
} from '@patternfly/react-core';
import CodeBranchIcon from '@patternfly/react-icons/dist/esm/icons/code-branch-icon';
import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import {DashboardCards, DashboardCards2} from './DashboardCards';

export class DashboardContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      allExpanded: false
    };

    this.onToggleAll = () => {
      this.setState(
        {
          allExpanded: !this.state.allExpanded
        },
        () => {
          if (this.state.allExpanded) {
            this.setState({
              expanded: ['ex-toggle1', 'ex-toggle2', 'ex-toggle3']
            });
          } else {
            this.setState({
              expanded: []
            });
          }
        }
      );
    };

    this.onToggle1 = isOpen1 => {
      this.setState({ isOpen1 });
    };

    this.onToggle2 = isOpen2 => {
      this.setState({ isOpen2 });
    };

    this.onToggle3 = isOpen3 => {
      this.setState({ isOpen3 });
    };

    this.onSelect1 = event => {
      this.setState(prevState => ({
        isOpen1: !prevState.isOpen1
      }));
    };

    this.onSelect2 = event => {
      this.setState(prevState => ({
        isOpen2: !prevState.isOpen2
      }));
    };

    this.onSelect3 = event => {
      this.setState(prevState => ({
        isOpen3: !prevState.isOpen3
      }));
    };
  }

  renderToolbar() {
    return (
      <React.Fragment>
        <Toolbar>
          <ToolbarContent>
            <ToolbarGroup>
              <ToolbarItem variant="expand-all" isAllExpanded={this.state.allExpanded}>
                <Tooltip
                  position="right"
                  content={
                    <div>
                      {this.state.allExpanded && 'Collapse all rows'}
                      {!this.state.allExpanded && 'Expand all rows'}
                    </div>
                  }
                >
                  <Button
                    onClick={this.onToggleAll}
                    variant="plain"
                    aria-label={this.state.allExpanded ? 'Collapse all rows' : 'Expand all rows'}
                  >
                    <ToolbarExpandIconWrapper>
                      <AngleRightIcon />
                    </ToolbarExpandIconWrapper>
                  </Button>
                </Tooltip>
              </ToolbarItem>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      </React.Fragment>
    );
  }

  render() {
    const toggle = id => {
      const expanded = this.state.expanded;
      const index = expanded.indexOf(id);
      const newExpanded =
        index >= 0 ? [...expanded.slice(0, index), ...expanded.slice(index + 1, expanded.length)] : [...expanded, id];
      this.setState(() => ({ expanded: newExpanded }));
      if (newExpanded.length === 3) {
        this.setState(() => ({ allExpanded: true }));
      } else if (newExpanded.length === 0) {
        this.setState(() => ({ allExpanded: false }));
      }
    };

    return (
      <React.Fragment>
        <br />
        <br />
        <DataList aria-label="Expandable data list example">
          <DataListItem aria-labelledby="ex-item1" isExpanded={this.state.expanded.includes('ex-toggle1')}>
            <DataListItemRow>
              <DataListToggle
                onClick={() => toggle('ex-toggle1')}
                isExpanded={this.state.expanded.includes('ex-toggle1')}
                id="ex-toggle1"
                aria-controls="ex-expand1"
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell isIcon key="icon">
                    <CodeBranchIcon />
                  </DataListCell>,
                  <DataListCell key="primary content">
                    <div id="ex-item1">application-service</div>
                    <span>A Kubernetes controller/operator that is manages service provider integration tasks.</span>
                  </DataListCell>,
                ]}
              />
              <DataListAction
                aria-labelledby="ex-item1 ex-action1"
                id="ex-action1"
                aria-label="Actions"
                isPlainButtonAction
              >
                <Button
                onClick={() => toggle('ex-toggle1')}                
                id="ex-toggle1"
                aria-controls="ex-expand1"
                variant="link"
              >View Details</Button>
              </DataListAction>
            </DataListItemRow>
            <DataListContent
              aria-label="Primary Content Details"
              id="ex-expand1"
              isHidden={!this.state.expanded.includes('ex-toggle1')}
            >
              <DashboardCards></DashboardCards>
            </DataListContent>
          </DataListItem>
          <DataListItem aria-labelledby="ex-item1" isExpanded={this.state.expanded.includes('ex-toggle2')}>
            <DataListItemRow>
              <DataListToggle
                onClick={() => toggle('ex-toggle2')}
                isExpanded={this.state.expanded.includes('ex-toggle2')}
                id="ex-toggle1"
                aria-controls="ex-expand1"
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell isIcon key="icon">
                    <CodeBranchIcon />
                  </DataListCell>,
                  <DataListCell key="primary content">
                    <div id="ex-item1">service-provider-integration-api</div>
                    <span>Managing access to the third-party service providers API</span>
                  </DataListCell>,
                ]}
              />
              <DataListAction
                aria-labelledby="ex-item1 ex-action1"
                id="ex-action1"
                aria-label="Actions"
                isPlainButtonAction
              >
                <Button
                onClick={() => toggle('ex-toggle2')}                
                id="ex-toggle1"
                aria-controls="ex-expand1"
                variant="link"
              >View Details</Button>
              </DataListAction>
            </DataListItemRow>
            <DataListContent
              aria-label="Primary Content Details"
              id="ex-expand1"
              isHidden={!this.state.expanded.includes('ex-toggle2')}
            >
              <DashboardCards2></DashboardCards2>
            </DataListContent>
          </DataListItem>
          <DataListItem aria-labelledby="ex-item3" isExpanded={this.state.expanded.includes('ex-toggle3')}>
            <DataListItemRow>
              <DataListToggle
                onClick={() => toggle('ex-toggle3')}
                isExpanded={this.state.expanded.includes('ex-toggle3')}
                id="ex-toggle3"
                aria-controls="ex-expand3"
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell isIcon key="icon">
                    <CodeBranchIcon />
                  </DataListCell>,
                  <DataListCell key="tertiary content">
                    <div id="ex-item3">managed-gitops</div>
                    <span>GitOps Service PoC: Frontend/backend/cluster-agent components aiming to provided GitOps services via Kubernetes-controller-managed Argo CD</span>
                  </DataListCell>,
                ]}
              />
            </DataListItemRow>
            <DataListContent
              aria-label="Primary Content Details"
              id="ex-expand3"
              isHidden={!this.state.expanded.includes('ex-toggle3')}
              hasNoPadding
            >
              This expanded section has no padding.
            </DataListContent>
          </DataListItem>
        </DataList>
      </React.Fragment>
    );
  }
}