import { useState } from 'react';
import classes from './FormHandler.module.css';
import { InputCtrl } from '../../components/inputCtrl/inputCtrl';
import service from '../../common/services/service';

const FormHandler = (props) => {
    const [instanceLabel, setInstanceLabel] = useState(service.generateInstanceLabel())
    const [formValues, setFormValues] = useState([...props.displayfields]);
    const [formSubmittedValues, setFormSubmittedValues] = useState([]);
    const changeHandler = (event, name) => {
        for (let i = 0; i < formValues.length; i++) {
            if (event.target.name === formValues[i].name) {
                if (event.target.type === 'date') {
                    formValues[i].value = new Date(event.target.value).toISOString();
                } else {
                    formValues[i].value = event.target.value;
                }

                setFormValues([...formValues]);
            }
        }
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const formObj = {};
        formObj['$original'] = {}
        for (let i = 0; i < formValues.length; i++) {
            if (formValues[i].value) {
                formObj[formValues[i].name] = formValues[i].value;
                formObj.$original[formValues[i].name] = props.data[formValues[i].name] ? props.data[formValues[i].name] : null;
            }
        }

        setInstanceLabel(service.generateInstanceLabel());
        alert(JSON.stringify(formObj));

        const arr = [...formSubmittedValues];
        arr.push({ 'id': instanceLabel, 'val': JSON.stringify(formObj) });
        service.store(instanceLabel, formObj, 'formValues');
        setFormSubmittedValues(arr);
        console.log(formValues,props.displayfields);
        resetForm();
    }

    const resetForm = () => {
        for (let obj of formValues){
            obj.value = '';
        }
      //  setFormValues([...formValues]);
    }

    return (
        <div>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.header}>
                    {props.entityLabel} # {instanceLabel}      <button >Save</button>
                </div>
                {formValues.map(obj => {
                    return (
                        <div key={obj.label} className={classes.inputDiv}>
                            <InputCtrl
                                key={obj.label}
                                type={obj.dataType}
                                label={obj.label}
                                name={obj.name}
                                default={props.data[obj.name]}
                                value={obj.value}
                                changed={(event) => changeHandler(event, obj.name)}
                            />
                        </div>
                    )
                })}
            </form>
            <div className={classes.savedValues} >
                Saved Values:
                <ul>
                    {formSubmittedValues.map(a => {
                        return (
                            <li key={a.id} className={classes.displayBlock}>
                                <div className={classes.displayBlock} >Instance:  {a.id} </div>
                                <div className={classes.displayBlock} >Values: {a.val} </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export { FormHandler }