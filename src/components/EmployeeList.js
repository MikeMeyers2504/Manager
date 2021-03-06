import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
	componentWillMount() {
		this.props.employeesFetch();

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// nextProps are the nexct set of props that this component will be rendered with
		// this.props is still the old set of props
		// nice lifecycle method for reacting to any change in yours props object
		this.createDataSource(nextProps);
	}

	createDataSource({ employees }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(employees);
	}

	renderRow(employee) {
		return <ListItem employee={employee} />;
	}

	render() {
		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}

const mapStateToProps = state => {
	// val is the user model (name, phone, shift) and the key(uid)
	const employees = _.map(state.employees, (val, uid) => {
		return { ...val, uid }; // { shift: 'monday', name: 'S', id: '12uj3' };
	});

	return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
