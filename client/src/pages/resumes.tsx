import React from 'react'
import { NavLink } from 'react-router-dom'
import { Trash, Copy, Eye, Pen, Pencil } from 'lucide-react'
import { Tooltip } from 'react-tooltip'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../state/store'
import { actions } from '../state/resumes/resumes'

import { v4 as uuid } from 'uuid'

interface ResumeProps {}
const Resumes = () => {
  const dispatch = useDispatch()
  const deleteResume = (e, targetResumeID) => {
    dispatch(actions.deleteResume(targetResumeID))
  }
  const cloneResume = (e, targetResume) => {
    let newResume = structuredClone(targetResume)
    newResume.id = uuid()
    dispatch(actions.cloneResume(newResume))
  }

  const resumes = useSelector((state: RootState) => state.resumes)
  //   console.log('resumes', resumes)
  return (
    <main className='container resumes-page'>
      {/* <h1>Resumes</h1> */}
      <ul>
        {resumes.loaded ? (
          resumes.data.map(resume => {
            const { title, id } = resume

            return (
              <li key={id}>
                <h2>{title}</h2>
                <div className='buttons'>
                  <button data-tooltip-id='edit' data-tooltip-content='Edit'>
                    <NavLink to={`/editor/${id}`}>
                      <Pen />
                    </NavLink>
                  </button>
                  <Tooltip id='edit' />
                  <button
                    data-tooltip-id='preview'
                    data-tooltip-content='Preview'
                  >
                    <NavLink to={`/preview/${id}`}>
                      <Eye />
                    </NavLink>
                  </button>
                  <Tooltip id='preview' />
                  <button
                    data-tooltip-id='clone'
                    data-tooltip-content='Clone'
                    onClick={e => cloneResume(e, resume)}
                  >
                    <Copy />
                  </button>
                  <Tooltip id='clone' />
                  <button
                    data-tooltip-id='delete'
                    data-tooltip-content='Delete'
                    onClick={e => deleteResume(e, resume.id)}
                  >
                    <Trash />
                  </button>
                  <Tooltip id='delete' />
                </div>
              </li>
            )
          })
        ) : (
          <>Loading</>
        )}
      </ul>
    </main>
  )
}

export default Resumes
