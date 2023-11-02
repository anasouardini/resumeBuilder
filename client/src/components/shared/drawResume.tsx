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
        <div>
            {resume.components.map((component) => {

                const EditButton = () => {
                    return <>{
                        editable
                            ? <button
                                key={component.order}
                                onClick={(e) => editCB(component.name)}
                                style={{
                                    color: '#d4470f',
                                    width: 'auto',
                                    height: 'auto',
                                    padding: 0,
                                    marginRight: '1rem',
                                    border: 'none',
                                    background: 'transparent',
                                }}
                            ><Pen size={15} /></button>
                            : <></>
                    }</>
                }

                switch (component.type) {
                    case 'heading': {
                        return <>
                            <EditButton />
                            <h2
                                key={component.order}
                                style={{
                                    color: component.color,
                                    padding: `${component.spacing}rem 0`
                                }}
                                data-name={component.name}
                            >
                                {component.value}
                            </h2></>
                    }
                    case 'text': {
                        return <>
                            <EditButton />
                            <p
                                key={component.order}
                                style={{
                                    color: component.color,
                                    padding: `${component.spacing}rem 0`
                                }}
                                data-name={component.name}
                            >
                                {component.value}
                            </p></>
                    }
                    case 'list': {
                        return <>
                            <EditButton />
                            <ul
                                key={component.order}
                                style={{
                                    color: component.color,
                                    padding: `${component.spacing}rem 0`
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
                            </ul></>
                    }
                    default: {
                        return <>
                            <EditButton />
                            <p
                                key={component.type}
                            >
                                Component with type {component.type} is not supported.
                            </p>
                        </>;
                    }
                }
            })}
        </div >
    )
}

export default DrawResume