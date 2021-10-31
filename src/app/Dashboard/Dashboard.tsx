import React from 'react';
import {
  Bullseye,
  Button,
  Card,
  CardHeader,
  CardActions,
  CardTitle,
  CardBody,
  Checkbox,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  DropdownPosition,
  DropdownToggleCheckbox,
  EmptyState,
  EmptyStateIcon,
  EmptyStateVariant,
  EmptyStateSecondaryActions,
  Gallery,
  KebabToggle,
  OverflowMenu,
  OverflowMenuControl,
  OverflowMenuDropdownItem,
  OverflowMenuItem,
  PageSection,
  PageSectionVariants,
  Pagination,
  Select,
  SelectOption,
  SelectVariant,
  TextContent,
  Text,
  Title,
  Toolbar,
  ToolbarItem,
  ToolbarFilter,
  Modal, Button, Wizard
} from '@patternfly/react-core';
import { DashboardContent } from './DashboardContent';
export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.state = {
      isModalOpen: false,
      filters: {
        products: []
      },
      res: [],
      isChecked: false,
      selectedItems: [],
      areAllSelected: false,
      isUpperToolbarDropdownOpen: false,
      isUpperToolbarKebabDropdownOpen: false,
      isLowerToolbarDropdownOpen: false,
      isLowerToolbarKebabDropdownOpen: false,
      isCardKebabDropdownOpen: false,
      activeItem: 0,
      splitButtonDropdownIsOpen: false,
      page: 1,
      perPage: 10,
      totalItemCount: 10
    };
    this.handleModalToggle = () => {
      this.setState(({ isModalOpen }) => ({
        isModalOpen: !isModalOpen
      }));
    };

    this.onToolbarDropdownToggle = isLowerToolbarDropdownOpen => {
      this.setState(prevState => ({
        isLowerToolbarDropdownOpen
      }));
    };

    this.onToolbarKebabDropdownToggle = isLowerToolbarKebabDropdownOpen => {
      this.setState({
        isLowerToolbarKebabDropdownOpen
      });
    };

    this.onToolbarKebabDropdownSelect = event => {
      this.setState({
        isLowerToolbarKebabDropdownOpen: !this.state.isLowerToolbarKebabDropdownOpen
      });
    };

    this.onCardKebabDropdownToggle = (key, isCardKebabDropdownOpen) => {
      this.setState({
        [key]: isCardKebabDropdownOpen
      });
    };

    this.onCardKebabDropdownSelect = (key, event) => {
      this.setState({
        [key]: !this.state[key]
      });
    };

    this.deleteItem = item => event => {
      const filter = getter => val => getter(val) !== item.id;
      this.setState({
        res: this.state.res.filter(filter(({ id }) => id)),
        selectedItems: this.state.selectedItems.filter(filter(id => id))
      });
    };

    this.onSetPage = (_event, pageNumber) => {
      this.setState({
        page: pageNumber
      });
    };

    this.onPerPageSelect = (_event, perPage) => {
      this.setState({
        perPage
      });
    };

    this.onSplitButtonToggle = isOpen => {
      this.setState({
        splitButtonDropdownIsOpen: isOpen
      });
    };

    this.onSplitButtonSelect = event => {
      this.setState((prevState, props) => {
        return { splitButtonDropdownIsOpen: !prevState.splitButtonDropdownIsOpen };
      });
    };

    this.onNameSelect = (event, selection) => {
      const checked = event.target.checked;
      this.setState(prevState => {
        const prevSelections = prevState.filters['products'];
        return {
          filters: {
            ...prevState.filters,
            ['products']: checked ? [...prevSelections, selection] : prevSelections.filter(value => value !== selection)
          }
        };
      });
    };

    this.onDelete = (type = '', id = '') => {
      if (type) {
        this.setState(prevState => {
          prevState.filters[type.toLowerCase()] = prevState.filters[type.toLowerCase()].filter(s => s !== id);
          return {
            filters: prevState.filters
          };
        });
      } else {
        this.setState({
          filters: {
            products: []
          }
        });
      }
    };
  }

  selectedItems(e) {
    const { value, checked } = e.target;
    let { selectedItems } = this.state;

    if (checked) {
      selectedItems = [...selectedItems, value];
    } else {
      selectedItems = selectedItems.filter(el => el !== value);
      if (this.state.areAllSelected) {
        this.setState({
          areAllSelected: !this.state.areAllSelected
        });
      }
    }
    this.setState({ selectedItems });
  }

  splitCheckboxSelectAll(e) {
    const { checked } = e.target;
    const { isChecked, res } = this.state;
    let collection = [];

    if (checked) {
      for (var i = 0; i <= 9; i++) collection = [...collection, i];
    }

    this.setState(
      {
        selectedItems: collection,
        isChecked: isChecked,
        areAllSelected: checked
      },
      this.updateSelected
    );
  }

  selectPage(e) {
    const { checked } = e.target;
    const { isChecked, totalItemCount, perPage } = this.state;
    let collection = [];

    collection = this.getAllItems();

    this.setState(
      {
        selectedItems: collection,
        isChecked: checked,
        areAllSelected: totalItemCount === perPage ? true : false
      },
      this.updateSelected
    );
  }

  selectAll(e) {
    const { checked } = e.target;
    const { isChecked } = this.state;

    let collection = [];
    for (var i = 0; i <= 9; i++) collection = [...collection, i];

    this.setState(
      {
        selectedItems: collection,
        isChecked: true,
        areAllSelected: true
      },
      this.updateSelected
    );
  }

  selectNone(e) {
    const { checked } = e.target;
    const { isChecked, selectedItems } = this.state;
    this.setState(
      {
        selectedItems: [],
        isChecked: false,
        areAllSelected: false
      },
      this.updateSelected
    );
  }

  getAllItems() {
    const { res } = this.state;
    const collection = [];
    for (const items of res) {
      collection.push(items.id);
    }

    return collection;
  }

  handleCheckboxClick(checked, e) {
    const { value } = e.target;
    const { totalItemCount } = this.state;

    if (checked) {
      const collection = this.getAllItems();
      this.setState(prevState => ({
        selectedItems: [...prevState.selectedItems, value * 1],
        areAllSelected: totalItemCount === prevState.selectedItems.length + 1
      }));
    } else {
      this.setState(prevState => ({
        selectedItems: prevState.selectedItems.filter(item => item != value),
        areAllSelected: false
      }));
    }
  }

  updateSelected() {
    const { res, selectedItems } = this.state;
    let rows = res.map(post => {
      post.selected = selectedItems.includes(post.id);
      return post;
    });

    this.setState({
      res: rows
    });
  }

  fetch(page, perPage) {
    fetch(`https://my-json-server.typicode.com/jenny-s51/cardviewdata/posts?_page=${page}&_limit=${perPage}`)
      .then(resp => resp.json())
      .then(resp => this.setState({ res: resp, perPage, page }))
      .then(() => this.updateSelected())
      .catch(err => this.setState({ error: err }));
  }

  componentDidMount() {
    this.fetch(this.state.page, this.state.perPage);
  }

  renderPagination() {
    const { page, perPage, totalItemCount } = this.state;

    const defaultPerPageOptions = [
      {
        title: '1',
        value: 1
      },
      {
        title: '5',
        value: 5
      },
      {
        title: '10',
        value: 10
      }
    ];

    return (
      <Pagination
        itemCount={totalItemCount}
        page={page}
        perPage={perPage}
        perPageOptions={defaultPerPageOptions}
        onSetPage={(_evt, value) => {
          this.fetch(value, perPage);
        }}
        onPerPageSelect={(_evt, value) => {
          this.fetch(1, value);
        }}
        variant="top"
        isCompact
      />
    );
  }

  buildSelectDropdown() {
    const { splitButtonDropdownIsOpen, selectedItems, areAllSelected } = this.state;
    const numSelected = selectedItems.length;
    const allSelected = areAllSelected;
    const anySelected = numSelected > 0;
    const someChecked = anySelected ? null : false;
    const isChecked = allSelected ? true : someChecked;
    const splitButtonDropdownItems = [
      <DropdownItem key="item-1" onClick={this.selectNone.bind(this)}>
        Select none (0 items)
      </DropdownItem>,
      <DropdownItem key="item-2" onClick={this.selectPage.bind(this)}>
        Select page ({this.state.perPage} items)
      </DropdownItem>,
      <DropdownItem key="item-3" onClick={this.selectAll.bind(this)}>
        Select all ({this.state.totalItemCount} items)
      </DropdownItem>
    ];

    return (
      <Dropdown
        position={DropdownPosition.left}
        onSelect={this.onSplitButtonSelect}
        toggle={
          <DropdownToggle
            splitButtonItems={[
              <DropdownToggleCheckbox
                id="example-checkbox-2"
                key="split-checkbox"
                aria-label={anySelected ? 'Deselect all' : 'Select all'}
                isChecked={areAllSelected}
                onClick={this.splitCheckboxSelectAll.bind(this)}
              ></DropdownToggleCheckbox>
            ]}
            onToggle={this.onSplitButtonToggle}
          >
            {numSelected !== 0 && <React.Fragment>{numSelected} selected</React.Fragment>}
          </DropdownToggle>
        }
        isOpen={splitButtonDropdownIsOpen}
        dropdownItems={splitButtonDropdownItems}
      />
    );
  }

  buildFilterDropdown() {
    const { isLowerToolbarDropdownOpen, filters } = this.state;

    const filterDropdownItems = [
      <SelectOption key="patternfly" value="PatternFly" />,
      <SelectOption key="activemq" value="ActiveMQ" />,
      <SelectOption key="apachespark" value="Apache Spark" />,
      <SelectOption key="avro" value="Avro" />,
      <SelectOption key="azureservices" value="Azure Services" />,
      <SelectOption key="crypto" value="Crypto" />,
      <SelectOption key="dropbox" value="DropBox" />,
      <SelectOption key="jbossdatagrid" value="JBoss Data Grid" />,
      <SelectOption key="rest" value="REST" />,
      <SelectOption key="swagger" value="SWAGGER" />
    ];

    return (
      <ToolbarFilter categoryName="Products" chips={filters.products} deleteChip={this.onDelete}>
        <Select
          variant={SelectVariant.checkbox}
          aria-label="Products"
          onToggle={this.onToolbarDropdownToggle}
          onSelect={this.onNameSelect}
          selections={filters.products}
          isExpanded={isLowerToolbarDropdownOpen}
          placeholderText="Creator"
        >
          {filterDropdownItems}
        </Select>
      </ToolbarFilter>
    );
  }

  render() {
    const {
      isUpperToolbarDropdownOpen,
      isLowerToolbarDropdownOpen,
      isUpperToolbarKebabDropdownOpen,
      isLowerToolbarKebabDropdownOpen,
      isCardKebabDropdownOpen,
      splitButtonDropdownIsOpen,
      activeItem,
      filters,
      res,
      checked,
      selectedItems,
      areAllSelected,
      isChecked,
      page,
      perPage
    } = this.state;

    const toolbarKebabDropdownItems = [
      <OverflowMenuDropdownItem key="link">Link</OverflowMenuDropdownItem>,
      <OverflowMenuDropdownItem key="action" component="button">
        Action
      </OverflowMenuDropdownItem>,
      <OverflowMenuDropdownItem key="disabled link" isDisabled>
        Disabled Link
      </OverflowMenuDropdownItem>,
      <OverflowMenuDropdownItem key="disabled action" isDisabled component="button">
        Disabled Action
      </OverflowMenuDropdownItem>,
      <DropdownSeparator key="separator" />,
      <OverflowMenuDropdownItem key="separated link">Separated Link</OverflowMenuDropdownItem>,
      <OverflowMenuDropdownItem key="separated action" component="button">
        Separated Action
      </OverflowMenuDropdownItem>
    ];

    const toolbarItems = (
      <React.Fragment>
        <ToolbarItem variant="bulk-select">{this.buildSelectDropdown()}</ToolbarItem>
        <ToolbarItem breakpoint="xl">{this.buildFilterDropdown()}</ToolbarItem>
        <ToolbarItem variant="overflow-menu">
          <OverflowMenu breakpoint="md">
            <OverflowMenuItem>
              <Button variant="primary">Create a project</Button>
            </OverflowMenuItem>
            <OverflowMenuControl hasAdditionalOptions>
              <Dropdown
                onSelect={this.onToolbarKebabDropdownSelect}
                toggle={<KebabToggle onToggle={this.onToolbarKebabDropdownToggle} id="toggle-id-6" />}
                isOpen={isLowerToolbarKebabDropdownOpen}
                isPlain
                dropdownItems={toolbarKebabDropdownItems}
              />
            </OverflowMenuControl>
          </OverflowMenu>
        </ToolbarItem>
        <ToolbarItem variant="pagination" alignment={{ default: 'alignRight' }}>
          {this.renderPagination()}
        </ToolbarItem>
      </React.Fragment>
    );

    const { isModalOpen } = this.state;

    const steps = [
      { name: 'Step 1', component: <p>Step 1</p> },
      { name: 'Step 2', component: <p>Step 2</p> },
      { name: 'Step 3', component: <p>Step 3</p> },
      { name: 'Step 4', component: <p>Step 4</p> },
      { name: 'Review', component: <p>Review Step</p>, nextButtonText: 'Finish' }
    ];

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
              <Text component="h1">Red Hat App Studio</Text>
              <Text component="p">This is a demo that show app studio metrics.</Text>
            </TextContent>
          </PageSection>
          <DashboardContent />
          <PageSection isFilled={false} sticky="bottom" padding={{ default: 'noPadding' }} variant="light">
            <Pagination
              itemCount={this.state.totalItemCount}
              page={page}
              page={this.state.page}
              perPage={this.state.perPage}
              onPerPageSelect={this.onPerPageSelect}
              onSetPage={this.onSetPage}
              variant="bottom"
            />
          </PageSection>
      </React.Fragment>
    );
  }
}