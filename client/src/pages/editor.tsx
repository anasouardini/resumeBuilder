import React, { cloneElement, useEffect, useRef } from 'react'
import * as yup from 'yup';

import { useParams } from 'react-router-dom'

import { Pen } from 'lucide-react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { actions } from '../state/resumes/resumes';
import CustomForm from '../components/shared/customForm';
import DrawResume from '../components/shared/drawResume';


interface EditorProps { }
const Editor = ({ }: EditorProps) => {

  const dispatch = useDispatch();

  interface FormValues {
    // template: string,
    name: string,
    type: string,
    order: number,
    color: string,
    spacing: number,
    value: string
  }
  interface Input {
    name: keyof FormValues,
    type: 'text' | 'number' | 'list',
    list?: string[],
    value: string,
    placeholder: string
  }
  interface State {
    form: {
      inputs: Input[],
      currentItemID: string
    }
  }
  const [state, setState] = React.useState<State>({
    form: {
      inputs: [
        // {
        //   name: 'template',
        //   type: 'list',
        //   list: ['dummy-template'],
        //   value: '',
        // placeholder: 'component name',
        // },
        {
          name: 'name',
          type: 'text',
          value: '',
          placeholder: 'e.g. my full name',
        },
        {
          name: 'type',
          type: 'list',
          list: ['text', 'heading', 'list'],
          value: 'text',
          placeholder: '',
        },
        {
          name: 'order',
          type: 'number',
          value: '1',
          placeholder: '',
        },
        {
          name: 'color',
          type: 'text',
          value: 'black',
          placeholder: '',
        },
        {
          name: 'spacing',
          type: 'number',
          value: '1',
          placeholder: '',
        },
        {
          name: 'value',
          type: 'text',
          value: '',
          placeholder: 'e.g. Name: Anas Ouardini',
        }
      ],
      currentItemID: ''
    }
  });
  const resumes = useSelector((state: RootState) => state.resumes);
  // console.log('preview', resumes)
  const { resumeID } = useParams();
  const resume = resumes.data.filter((resume) => resume.id === resumeID)[0];
  const outputResumeRef = useRef<RootState['resumes']['data'][0]>();
  React.useEffect(() => {
    if (resume) {
      outputResumeRef.current = structuredClone(resume)
    }
  }, [resume]);

  const updateResume = (newResume) => {
    const newResumeClone = structuredClone({ ...resume, ...newResume });
    console.log('update resume', newResumeClone)
    dispatch(actions.updateResume(newResumeClone));
  }
  const handleResumeComponentChange = (newComponentValues) => {
    //! code smell
    if (outputResumeRef.current?.components?.length) {
      for (let i = 0; i < outputResumeRef.current?.components.length; i++) {
        let currentComponent = outputResumeRef.current?.components[i];
        if (currentComponent.name === state.form.currentItemID) {
          outputResumeRef.current.components[i] = structuredClone(newComponentValues);
          break;
        }
      }
      // console.log(outputResumeRef.current?.components)
      updateResume(outputResumeRef.current);
    }
  }

  const handleEditComponent = (componentName) => {
    const targetComponent = outputResumeRef.current?.components.filter((component) => component.name === componentName)[0];
    // console.log('component', componentName);
    const newState = structuredClone(state);
    newState.form.currentItemID = targetComponent.name;
    newState.form.inputs = newState.form.inputs.map((input) => {
      // console.log('handle edit', targetComponent, input.name)
      return { ...input, value: targetComponent[input.name] };
    });
    // console.log(newState.form.inputs);
    setState(newState);
  }
  const handleTitleChange = (e) => {
    if (outputResumeRef.current) {
      outputResumeRef.current.title = e.target.value;
    }
  }

  if (!resumes.loaded) {
    return <>Loading...</>
  }

  if (!resume) {
    return <>Resume with the id ({resumeID}) couldn't be found!</>
  }

  return (
    <main className='container editor'>
      <section aria-label='editing form'>
        <CustomForm
          inputs={state.form.inputs}
          onSubmitCB={handleResumeComponentChange}
          validationSchema={
            yup.object().shape({
              type: yup
                .string()
                .oneOf(['text', 'heading', 'list'])//todo: dynamically, get list of existing types
                .required("Type is required!"),
                spacing: yup.number().min(1).max(4).required("Spacing is required!"),
            })
          }
        />
      </section>
      <section aria-label='output'>
        <h1 >
          <input type='text' defaultValue={resume.title} onChange={handleTitleChange} />
        </h1>
        <DrawResume resume={resume} editable={true} editCB={handleEditComponent} />
      </section>
    </main >
  )
}

export default Editor