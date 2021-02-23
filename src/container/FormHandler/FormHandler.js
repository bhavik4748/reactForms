import { useState } from 'react';
import classes from './FormHandler.module.css';
import { InputCtrl } from '../../components/inputCtrl/inputCtrl';
import service from '../../common/services/service';

const FormHandler = (props) => {
    const [instanceLabel, setInstanceLabel] = useState(service.generateInstanceLabel())
    const [formValues, setFormValues] = useState(props.displayfields);
    const [formSubmittedValues, setFormSubmittedValues] = useState([]);
    const changeHandler = (event, name) => {
        for (let i = 0; i < formValues.length; i++) {
            if (event.target.name === formValues[i].name) {
                if (event.target.type === 'date') {
                    formValues[i].value = new Date(event.target.value).toISOString();
                } else {
                    formValues[i].value = event.target.value;
                }

                setFormValues(formValues);
            }
        }
    }
    const submitHandler = (event) => {
        event.preventDefault();
        let formObj = {};
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
        setFormSubmittedValues(arr);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className={classes.header}>
                    {props.entityLabel} : {instanceLabel}      <button >Save</button>
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
                                changed={(event) => changeHandler(event, obj.name)}
                            />
                        </div>
                    )
                })}
            </form>
            <div>
                Saved Values:
                <ul>
                    {formSubmittedValues.map(a => {
                        return (
                            <li className={classes.displayBlock}>
                                <div className={classes.displayBlock} key={a.id}>Instance:  {a.id} </div>
                                <div className={classes.displayBlock} key={a.id}>{a.val} </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export { FormHandler }