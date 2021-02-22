const InputCtrl = (props) => {

    let controls = '';
    switch (props.type) {
        case 'String':
            controls = (
                <div>
                    <label htmlFor={props.name} >{props.label}</label>
                    <input type="text" name={props.name} id="name" />
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