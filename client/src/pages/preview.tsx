import React from 'react'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { RootState } from '../state/store'

import DrawResume from '../components/shared/drawResume'

interface PreviewProps {}
const Preview = ({}: PreviewProps) => {
  const resumes = useSelector((state: RootState) => state.resumes)
  // console.log('preview', resumes)
  const { resumeID } = useParams()
  const resume = resumes.data.filter(resume => resume.id === resumeID)[0]

  if (!resumes.loaded) {
    return <>Loading...</>
  }

  if (!resume) {
    return <>Resume with the id ({resumeID}) couldn't be found!</>
  }

  return (
    <main className='container'>
      <h1 style={{ fontSize: '1.7rem', marginBottom: '2rem' }}>
        Preview: {resume.title}
      </h1>
      <DrawResume resume={resume} />
    </main>
  )
}

export default Preview
