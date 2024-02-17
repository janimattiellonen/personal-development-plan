import {useFieldArray, useFormContext } from "react-hook-form";

import {useNavigate} from "react-router-dom";

import * as Input from "../../../components/Form/Input";
import {Checkbox} from "../../../components/Form/Checkbox";
import {DatePicker} from "../../../components/DatePicker";

import {Button} from "../../../components/Button";

export function TrainingSessionForm() {
  const navigate = useNavigate();
  const { control, getValues} = useFormContext();

  const { fields, append, remove} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "trainingSessions", // unique name for your Field Array
  });

  return (
    <div>
      <button onClick={() => append({ name: "", isActive: false, startsAt: null, endsAt: null})}>Add</button>

      {fields.map((field, index) => {
        const trainingSessionId = parseInt(getValues(`trainingSessions.${index}.id`), 10);

        return (
          <div key={`training-sessions-${field.id}`}>
            <fieldset>
              <legend>{`Training session #${index + 1}`}</legend>
              <p>{getValues(`trainingSessions.${index}.id`)}</p>
              <Input.Text id={`trainingSessions.${index}.name`} name={`trainingSessions.${index}.name`} label="Name" />
              <Checkbox label="Is active" name={`trainingSessions.${index}.isActive`} id={`trainingSessions.${index}.isActive`} />

              <DatePicker id={`trainingSessions.${index}.startsAt`} name={`trainingSessions.${index}.startsAt`} label="Starts at"/>
              <DatePicker id={`trainingSessions.${index}.endsAt`} name={`trainingSessions.${index}.endsAt`} label="Ends at"/>

              {!!trainingSessionId && <Button $variant={'neutral'} onClick={() => navigate(`/admin/training-session/${trainingSessionId}/exercise/add`)}>Exercises</Button>}
              <Button $variant={'danger'} onClick={() => {remove(index)}}>remove</Button>
            </fieldset>
        </div>
        )
      })}
    </div>
  )
}
