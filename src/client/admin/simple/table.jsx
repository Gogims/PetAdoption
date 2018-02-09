import React from 'react';
import { Table } from 'semantic-ui-react';
import SimpleTableBody from './tableBody';
import helper from '../../../helper';

class SimpleTable extends React.Component {

  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      entities: nextProps.data[nextProps.entities]
    });
  }

  handleCreate(id, value) {
    return null;
  }

  handleUpdate(id, value) {
    this.props.updateMutate({
      variables: {
        entity: {
          id: id,
          [this.props.entity]: value
        }
      }
    })
    .then(({ data }) => {
      const updatedEntity = data["update" + this.props.capitalized];
      const updatedEntities = this.state.entities.map(entity => {
        const result = entity.id === updatedEntity.id ? entity : updatedEntity;
        
        return result;
      });

      this.setState({
        entities: updatedEntities
      });
      
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (this.props.data.loading || this.props.data.error) {
      return null;
    }

    const entities = this.state.entities;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              {this.props.capitalized}
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            entities.map(entity => {
              const value = entity[this.props.entity];
              
              return <SimpleTableBody 
                        key={entity.id} 
                        value={value} 
                        id={entity.id} 
                        onHandleCreate={this.handleCreate}
                        onHandleUpdate={this.handleUpdate}
                      />;
            })
          }
        </Table.Body>
      </Table>
    );
  }
}

//export default enhancerFunction(SpecieList);
export default SimpleTable;