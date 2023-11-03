import React, { cloneElement, useEffect, useRef } from 'react';
import * as yup from 'yup';

import { useParams } from 'react-router-dom';

import { Pen, PenBox, X } from 'lucide-react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { actions } from '../state/resumes/resumes';
import CustomForm from '../components/shared/customForm';
import DrawResume from '../components/shared/drawResume';
import { resumeFormSchem } from '../types/formValidation';

interface EditorProps {}
const Editor = ({}: EditorProps) => {
  const dispatch = useDispatch();

  interface FormValues {
    // template: string,
    name: string;
    type: string;
    order: number;
    color: string;
    spacing: number;
    value: string;
  }
  interface Input {
    name: keyof FormValues;
    type: 'text' | 'number' | 'list';
    list?: string[];
    value: string;
    placeholder: string;
  }
  interface State {
    form: {
      inputs: Input[];
      currentItemID: string;
      mode: 'create' | 'edit';
    };
    smallScreen: boolean;
  }
  const defaultInputs: Input[] = [
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
    },
  ];

  const [state, setState] = React.useState<State>({
    form: {
      inputs: defaultInputs,
      currentItemID: '',
      mode: 'edit',
    },
    smallScreen: false,
  });
  const resumes = useSelector((state: RootState) => state.resumes);
  // console.log('preview', resumes)
  const { resumeID } = useParams();
  type Resume = RootState['resumes']['data'][0];
  type ResumeComponent = Resume['components'][0];
  const resume = resumes.data.filter(resume => resume.id === resumeID)[0];
  const outputResumeRef = useRef<Resume>();
  React.useEffect(() => {
    if (resume) {
      outputResumeRef.current = structuredClone(resume);
    }
  }, [resume]);

  const formModalRef = React.useRef();

  // set smallScreen flag on screen width below 700px
  React.useEffect(() => {
    const eventCB = () => {
      let stateClone = state; // stale state copy to satisfy TS.
      // getting real state; avoiding closure copy.
      setState(state => {
        stateClone = structuredClone(state);
        return state;
      });
      if (window.screen.width < 700 && !stateClone.smallScreen) {
        // console.log('small screen', window.screen.width);
        stateClone.smallScreen = true;
        setState(stateClone);
      } else if (window.screen.width >= 700 && stateClone.smallScreen) {
        // console.log('large screen', window.screen.width);
        stateClone.smallScreen = false;
        setState(stateClone);
      }
    };

    window.addEventListener('resize', eventCB);

    // clean up
    return () => removeEventListener('resize', eventCB);
  }, []);

  const updateResume = newResume => {
    const newResumeClone = structuredClone({ ...resume, ...newResume });
    // console.log('update resume', newResumeClone);
    dispatch(actions.updateResume(newResumeClone));
  };

  const handleformSubmit = (
    newComponentValues: ResumeComponent,
    mode: 'create' | 'edit',
  ) => {
    //! code smell
    if (outputResumeRef.current?.components?.length) {
      if (mode === 'edit') {
        for (let i = 0; i < outputResumeRef.current?.components.length; i++) {
          let currentComponent = outputResumeRef.current?.components[i];
          if (currentComponent.name === state.form.currentItemID) {
            outputResumeRef.current.components[i] =
              structuredClone(newComponentValues);
            break;
          }
        }
      } else {
        outputResumeRef.current.components.push(
          structuredClone(newComponentValues),
        );
      }

      // console.log(outputResumeRef.current?.components)
      updateResume(outputResumeRef.current);
    }
  };

  const handleEditComponent = componentName => {
    const newState = structuredClone(state);

    if (componentName === 'new') {
      const defaultInputsClone = structuredClone(defaultInputs);
      newState.form.inputs = defaultInputsClone.map(input => {
        if (input.name == 'order') {
          return {
            ...input,
            value: outputResumeRef.current?.components.length+1,
          };
        }
        return input;
      });
      newState.form.mode = 'create';
    } else {
      const targetComponent = outputResumeRef.current?.components.filter(
        component => component.name === componentName,
      )[0];
      // console.log('component', componentName);
      newState.form.currentItemID = targetComponent.name;
      newState.form.inputs = newState.form.inputs.map(input => {
        // console.log('handle edit', targetComponent, input.name)
        return { ...input, value: targetComponent[input.name] };
      });
      newState.form.mode = 'edit';
    }
    // if modal is loaded in the DOM, show the modal.
    if (formModalRef.current) {
      formModalRef.current.showModal();
    }

    // console.log(newState.form.inputs);
    setState(newState);
  };
  const handleTitleChange = e => {
    if (outputResumeRef.current) {
      outputResumeRef.current.title = e.target.value;
    }
    updateResume(outputResumeRef.current);
  };

  if (!resumes.loaded) {
    return <>Loading...</>;
  }

  if (!resume) {
    return <>Resume with the id ({resumeID}) couldn't be found!</>;
  }

  return (
    <main className='container editor'>
      <section
        aria-label='editing form'
        style={{ marginRight: state.smallScreen ? '' : '2rem' }}
      >
        {state.smallScreen ? (
          <>
            <button
              data-form-modal-show
              onClick={() => {
                formModalRef.current?.showModal();
              }}
            >
              <PenBox size={30} />
            </button>
            <dialog ref={formModalRef} data-form-modal>
              <button
                data-form-modal-close
                onClick={() => {
                  formModalRef.current?.close();
                }}
              >
                <X size={35} />
              </button>
              <CustomForm
                inputs={state.form.inputs}
                mode={state.form.mode}
                onSubmitCB={handleformSubmit}
                validationSchema={resumeFormSchem}
              />
            </dialog>
          </>
        ) : (
          <CustomForm
            inputs={state.form.inputs}
            onSubmitCB={handleformSubmit}
            mode={state.form.mode}
            validationSchema={resumeFormSchem}
          />
        )}
      </section>
      <section aria-label='output'>
        <h1>
          <input
            type='text'
            defaultValue={resume.title}
            onChange={handleTitleChange}
          />
        </h1>
        <DrawResume
          resume={resume}
          editable={true}
          editCB={handleEditComponent}
        />
      </section>
    </main>
  );
};

export default Editor;
