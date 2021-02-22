import { useState, useEffect } from 'react';
import './App.css';

import myService from './common/services/service';
import { FormHandler } from './container/FormHandler/FormHandler';


function App() {
  const [data, setData] = useState(null);
  const [displayfields, setDisplayfields] = useState([]);

  const getEntityMeta = async () => {
    const userFields = await myService.getMeta();
    setDisplayfields(userFields);
  }

  const getEntityData = async () => {
    const result = await myService.getData();
    setData(result);
  }

  useEffect(() => {
    getEntityMeta();
  });

  useEffect(() => {
    getEntityData();
  })


  let form = '';
  if (data && displayfields.length)
    form = (<FormHandler displayfields={displayfields} data={data} ></FormHandler>)
  return (
    <div className="App">
      {form}
    </div>
  );
}

export default App;
