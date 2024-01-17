import { useFormContext} from "react-hook-form";

import {Alert} from "./Alert";

type ServerErrorProps = {
  errorMessage?: string;
}
export function ServerError({errorMessage}: ServerErrorProps) {
  const { formState: {errors}} = useFormContext();

  return (
    errors?.root?.serverError?.message && <Alert color="red">{errorMessage ? `${errorMessage}: ` : ''}{errors?.root?.serverError?.message}</Alert>
  )
}
