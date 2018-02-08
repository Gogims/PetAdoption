import React from 'react';
import { Table } from 'semantic-ui-react';
import SimpleTableBody from './tableBody';

class SimpleTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data.loading || this.props.data.error) {
      return null;
    }

    const entities = this.props.data[this.props.entities];
    const header = this.props.entity.charAt(0).toUpperCase() + this.props.entity.slice(1);

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              {header}
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            entities.map(entity => {
              const value = entity[this.props.entity];
              
              return <SimpleTableBody key={entity.id} value={value} id={entity.id} />;
            })
          }
        </Table.Body>
      </Table>
    );
  }
}

//export default enhancerFunction(SpecieList);
export default SimpleTable;