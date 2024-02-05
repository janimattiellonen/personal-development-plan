import * as Input from "../../../components/Form/Input";
import {Checkbox} from "../../../components/Form/Checkbox";

type TrainingSessionFieldProps = {
  name: string;
}
export function TrainingSessionField({name}: TrainingSessionFieldProps) {
  return (
    <div>
        <Input.Text id="training-session" name="training-session" label="Training session" />
        <Checkbox label="Is active" name="is-active" id="is-active" />
    </div>
  );
}
