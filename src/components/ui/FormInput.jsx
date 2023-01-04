import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { useField } from "formik"

const FormInput = (props) => {
  const { name, placeholder, label, ...otherProps } = props
  const [field, { error, touched }] = useField({ name })

  return (
    <label className="mb-3 border-0 rounded-lg">
      <span className="font-bold pr-5">{label}:</span>
      <input
        {...field}
        {...otherProps}
        placeholder={placeholder ?? label}
        className="border-0 rounded-lg px-2 text-black"
      />
      {error && touched ? (
        <div className="pt-2 text-red-600 text-sm flex flex-row">
          <ExclamationTriangleIcon className="h-5 w-5" />{" "}
          <span className="pl-2">{error}</span>
        </div>
      ) : null}
    </label>
  )
}

export default FormInput
