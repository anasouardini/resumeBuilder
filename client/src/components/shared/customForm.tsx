import React from 'react'
import { useFormik, Formik, Form, Field } from 'formik'
import { Pen, PenBox } from 'lucide-react'
import { toast } from 'react-toastify'

interface CustomFormInputs {
  inputs: Record<string, any>[]
  onSubmitCB: () => void
  validationSchema: {}
}
export default function CustomForm({
  inputs,
  onSubmitCB,
  validationSchema,
}: CustomFormInputs) {
  // console.log('form', inputs)
  return (
    <>
      <Formik
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          // console.log({ values, actions })
          setTimeout(() => {
            // todo: only update the currentlty edited/created component
            onSubmitCB(values)
            toast.success('Resume was edited successfully')
            actions.setSubmitting(false)
            // actions.resetForm();
          }, 1000)
        }}
        initialValues={inputs.reduce((acc, input) => {
          // console.log('initial values', input.value)
          acc[input.name] = input.value
          return acc
        }, {})}
        validationSchema={validationSchema}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            {inputs.map(input => {
              return (
                <>
                  <label key={input.name}>
                    {input.name}:
                    <Field
                      list={
                        input.type === 'list' ? `dataList-${input.name}` : ''
                      }
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      className={
                        touched[input.name] && errors[input.name]
                          ? 'invalid'
                          : ''
                      }
                    />
                    {input.type === 'list' ? (
                      <datalist key={input.name} id={`dataList-${input.name}`}>
                        {input.list?.map(optionValue => {
                          return (
                            <option value={optionValue} key={optionValue} />
                          )
                        })}
                      </datalist>
                    ) : (
                      <></>
                    )}
                  </label>
                  {touched[input.name] && errors[input.name] ? (
                    <p aria-label='input error msg' className='error'>
                      {errors[input.name]}
                    </p>
                  ) : (
                    <></>
                  )}
                </>
              )
            })}
            <button disabled={isSubmitting}>Save</button>
          </Form>
        )}
      </Formik>
    </>
  )
}
