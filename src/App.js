import { Component } from 'react';
import './App.css';

import myService from './common/services/service';
import { FormHandler } from './container/FormHandler/FormHandler';


class App extends Component {
  state = {
    data: null,
    displayfields: [],
    entityLabel: '',
    entityName: '',
  }

  getEntityMeta = async () => {
    const result = await myService.getMeta();
    this.setState({ displayfields: result.userFields, entityLabel: result.label, entityName: result.name })
  }

  getEntityData = async () => {
    const result = await myService.getData();
    this.setState({ data: result })
  }

  componentDidMount() {
    this.getEntityMeta();
    this.getEntityData();
  }

  render() {
    let form = '';
    if (this.state.data && this.state.displayfields.length)
      form = (
        <FormHandler
          displayfields={this.state.displayfields}
          data={this.state.data}
          entityLabel={this.state.entityLabel} >
        </FormHandler>
      )
    return (
      <div className="App">
        {form}
      </div>
    );
  }
}
export default App;
