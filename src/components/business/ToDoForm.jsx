import Button from "@/components/ui/Button"
import FormInput from "@/components/ui/FormInput"
import { Form, Formik } from "formik"
import * as yup from "yup"

const defaultValidSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
})

const defaultInitValues = {
  name: "",
}

const ToDoForm = (props) => {
  const {
    onSubmit,
    initValues = defaultInitValues,
    validSchema = defaultValidSchema,
  } = props

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initValues}
      validationSchema={validSchema}
    >
      <Form className="flex flex-col">
        <FormInput name="name" label="Name" placeholder="Lorem ipsum" />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  )
}

export default ToDoForm
