import classes from './FormHandler.module.css';
import { InputCtrl } from '../../components/inputCtrl/inputCtrl';

const FormHandler = (props) => {


    return (
        <form>
            Entity Type Label : Entity Instance Label       <button >Save</button>
            <div>
        
            </div>
            <label className={classes.myCustonClass}>Test</label>
            <input type="text"></input>

            <InputCtrl type="String" label='tt' name="bhavik" />

        </form>
    )
}

export { FormHandler }