import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import SimpleTableBody from './tableBody';
import helper from '../../../helper';

class SimpleTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      entities: props.data[props.entities]
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addEntity = this.addEntity.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => ({
      entities: nextProps.data[nextProps.entities]
    }));
  }

  addEntity() {
    if (!this.state.entities.some(entity => entity.new)) {
      const entitiesCount = this.state.entities.length;

      const newId = entitiesCount > 0 ?
        this.state.entities[entitiesCount - 1].id + 1 :
        1;

      const newEntity = Object.assign({}, {
        id: newId,
        [this.props.entity]: "",
        new: true
      });

      const newEntities = this.state.entities.concat([newEntity]);
      this.setState((prevState, props) => ({
        entities: newEntities
      }));
    }
  }

  handleCreate(id, value) {
    this.props.createMutate({
      refetchQueries: [
       {
         query: this.props.gqlRead
       } 
      ],
      variables: {
        entity: {
          [this.props.entity]: value
        }
      }
    })
    .then(({ data }) => {
      this.setState((prevState, props) => {
        const createdEntity = data["create" + props.capitalized];
        const entities = prevState.entities.map(entity => {
          if (entity.new) {
            entity = createdEntity;
          }

          return entity;
        });

        return {
          entities: entities
        };
      });
      
    }).catch((error) => {
      console.log(error);
    });
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
      this.setState((prevState, props) => {
        const updatedEntity = data["update" + props.capitalized];
        const updatedEntities = this.state.entities.map(entity => {
          const result = entity.id === updatedEntity.id ? updatedEntity : entity;

          return result;
        }); 

        return {
          entities: updatedEntities
        };
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  handleDelete(id) {
    let remove;
    const updatedEntities = this.state.entities.filter(entity => {
      if (entity.id === id) {
        remove = Object.assign({}, entity);
      }
      return entity.id !== id
    });

    if (remove.new) {
      this.setState(() => ({
        entities: updatedEntities
      }));
    }
    else {
      this.props.deleteMutate({
        refetchQueries: [
          {
            query: this.props.gqlRead
          }
        ],
        variables: {
          entity: {
            id: id
          }
        }
      })
      .then(({ data }) => {
        this.setState(() => ({
          entities: updatedEntities
        }));
      }).catch((error) => {
        console.log(error);
      });
    }
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
                        new={entity.new}
                        onHandleCreate={this.handleCreate}
                        onHandleUpdate={this.handleUpdate}
                        onHandleDelete={this.handleDelete}
                      />;
            })
          }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Button floated='right'
                icon
                labelPosition='left'
                size='medium'
                color="green"
                onClick={this.addEntity}>
                <Icon name='add' /> {this.props.capitalized}
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

//export default enhancerFunction(SpecieList);
export default SimpleTable;