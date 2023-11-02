import React from 'react'
import { RootState } from '../../state/store';
import { Pen } from 'lucide-react';

interface DrawResumeProps {
    resume: RootState['resumes']['data'][0];
    editable: boolean;
    editCB: (componentName: string) => void
}
const DrawResume = ({ resume, editable, editCB }: DrawResumeProps) => {
    return (
        <div className='resume-output'>
            {resume.components.map((component) => {

                const EditButton = () => {
                    return <>{
                        editable
                            ? <button
                                key={component.order}
                                onClick={(e) => editCB(component.name)}
                                style={{
                                    position: 'absolute',
                                    content: "",
                                    left: "-1.6rem",
                                    top: "50%",
                                    translate: "0 -50%",
                                    color: '#d4470f',
                                    width: 'auto',
                                    height: 'auto',
                                    padding: 0,
                                    marginRight: '1rem',
                                    border: 'none',
                                    background: 'transparent',
                                }}
                            ><Pen size={19} /></button>
                            : <></>
                    }</>
                }

                switch (component.type) {
                    case 'heading': {
                        return <div
                            className='component'
                        >
                            <EditButton />
                            <h2
                                key={component.order}
                                className='content'
                                style={{
                                    color: component.color,
                                    margin: `${component.spacing}rem 0`,
                                    padding: '.5rem'
                                }}
                                data-name={component.name}
                            >
                                {component.value}
                            </h2></div>
                    }
                    case 'text': {
                        return <div
                            className='component'
                        >
                            <EditButton />
                            <p
                                className='content'
                                key={component.order}
                                style={{
                                    color: component.color,
                                    margin: `${component.spacing}rem 0`,
                                    padding: '.5rem'
                                }}
                                data-name={component.name}
                            >
                                {component.value}
                            </p></div>
                    }
                    case 'list': {
                        return <div
                            className='component'
                        >
                            <EditButton />
                            <ul
                                className='content'
                                key={component.order}
                                style={{
                                    color: component.color,
                                    margin: `${component.spacing}rem 0`,
                                    padding: '.5rem'
                                }}
                                data-name={component.name}
                            >
                                {component.value.map((listItem) => {
                                    return <li
                                        key={listItem.order}
                                        data-name={listItem.name}
                                        style={{
                                            color: listItem.color
                                        }}
                                    >
                                        {listItem.value}
                                    </li>
                                })}
                            </ul></div>
                    }
                    default: {
                        return <div
                            className='resume-component-output'
                        >
                            <p
                                key={component.type}
                            >
                                Component with type {component.type} is not supported.
                            </p>
                        </div>;
                    }
                }
            })}
        </div >
    )
}

export default DrawResume