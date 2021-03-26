import { classes } from '../inputCtrl/inputCtrl.module.css';
const InputCtrl = (props) => {

    let controls = '';

    switch (props.type) {
        case 'Decimal':
        case 'Integer':
        case 'String':
            controls = (
                <div>
                    <label htmlFor={props.name} >{props.label}:
                        <input
                            type="text"
                            name={props.name}
                            id={props.name}
                            placeholder={props.default}
                            onChange={props.changed}
                            value={props.value}
                        />
                    </label>

                </div>
            )
            break;
        case 'Date':
            controls = (
                <div>
                    <label htmlFor={props.name} >{props.label}:
                        <input
                            type="date"
                            name={props.name}
                            id={props.name}
                            placeholder={props.default}
                            onChange={props.changed}
                            value={props.value}

                        />
                    </label>
                </div>
            )
            break;
        default:
    }
    return (
        <div>{controls}</div>
    )
}

export { InputCtrl };