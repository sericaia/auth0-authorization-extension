import React from 'react';
import { findDOMNode } from 'react-dom';
import { Button, ButtonToolbar, Nav, NavItem, Tabs, Tab } from 'react-bootstrap';
import { Pagination, SectionHeader, BlankState, SearchBar, Error, TableTotals, LoadingPanel } from 'auth0-extension-ui';

import UserGeneral from './UserGeneral';
import UserFederated from './UserFederated';
import UsersTable from './UsersTable';
import UserIcon from '../Icons/UsersIcon';

class UserOverview extends React.Component {
  constructor(props) {
    super(props);

    this.searchBarOptions = [
      {
        value: 'user',
        title: 'User',
        filterBy: ''
      },
      {
        value: 'email',
        title: 'Email',
        filterBy: 'email'
      },
      {
        value: 'connection',
        title: 'Connection',
        filterBy: 'identities.connection'
      }
    ];

    this.state = {
      selectedFilter: this.searchBarOptions[0],
      searchBarValue: props.searchBarValue
    };

    this.renderActions = this.renderActions.bind(this);
    this.handleUsersPageChange = this.handleUsersPageChange.bind(this);

    // Searchbar.
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onSearch(`${e.target.value}*`, this.state.selectedFilter.filterBy);
      this.props.saveSearchBarUsers(this.state.searchBarValue, this.state.selectedFilter.value);
    }
  }

  onReset() {
    this.props.onReset();
  }

  onHandleOptionChange = (option) => {
    this.setState({
      selectedFilter: option
    }, () => {
      this.props.saveSearchBarUsers(this.state.searchBarValue, this.state.selectedFilter.value);
    });
  }

  onHandleInputChange = (value) => {
    this.setState({
      searchBarValue: value
    });
  }

  handleUsersPageChange(page) {
    this.props.getUsersOnPage(page);
  }

  getSearchBarOptions(options, selectedValue) {
    return _.map(options, (item) => {
      item.selected = (item.value === selectedValue);
      return item;
    });
  }

  renderActions(user, index) {
    return this.props.renderActions(user, index);
  }

  renderEmptyState() {
    return (
      <BlankState
        title="Users"
        iconImage={
          <div className="no-content-image">
            <UserIcon />
          </div>
        }
        description="Lorem ipsum dolor sit amet."
      >
        <a href="https://auth0.com/docs/extensions/authorization-extension" rel="noopener noreferrer" target="_blank" className="btn btn-transparent btn-md">
          Read more
        </a>
      </BlankState>
    );
  }

  render() {
    const { loading, error, users, total, fetchQuery, searchBarValue, searchBarOptionValue, renderActions } = this.props;

    if (!error && !users.length && !loading && ((!fetchQuery || !fetchQuery.length) && !total)) { return this.renderEmptyState(); }

    return (
      <div>
        <Error message={error} />
        <SectionHeader title="Users" description="Here you will find all the users." />

        <UserGeneral />
        <div className="row" style={{ marginBottom: '20px' }}>
          <div className="col-xs-12">
            <SearchBar
              placeholder="Search for users"
              searchValue={this.state.searchBarValue}
              searchOptions={this.getSearchBarOptions(this.searchBarOptions, searchBarOptionValue)}
              handleKeyPress={this.onKeyPress}
              handleReset={this.onReset}
              handleOptionChange={this.onHandleOptionChange}
              handleInputChange={this.onHandleInputChange}
            />
          </div>
        </div>

        <LoadingPanel show={loading}>
          <div className="row">
            <div className="col-xs-12">
              <UsersTable loading={loading} users={users} renderActions={renderActions} />
            </div>
          </div>
        </LoadingPanel>
        <div className="row">
          <div className="col-xs-12">
            { process.env.PER_PAGE < total ?
              <Pagination
                totalItems={total}
                handlePageChange={this.handleUsersPageChange}
                perPage={process.env.PER_PAGE}
              /> :
              <TableTotals currentCount={users.length} totalCount={total} />
            }
          </div>
        </div>
      </div>
    );
  }
}

UserOverview.propTypes = {
  onReset: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired,
  error: React.PropTypes.object,
  users: React.PropTypes.array.isRequired,
  fetchQuery: React.PropTypes.string,
  searchValue: React.PropTypes.string,
  searchBarOptionValue: React.PropTypes.string,
  loading: React.PropTypes.bool.isRequired,
  renderActions: React.PropTypes.func.isRequired,
  getUsersOnPage: React.PropTypes.func.isRequired,
  saveSearchBarUsers: React.PropTypes.func.isRequired
};

export default UserOverview;
