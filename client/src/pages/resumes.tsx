import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trash, Copy, Eye, Pen, Pencil } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

interface ResumeProps {  }
const Resumes = () => {
	const resumes = useSelector((state: RootState) => state.resumes);
	//   console.log('resumes', resumes)
	return (
		<main className='container resumes-page'>
			{/* <h1>Resumes</h1> */}
			<ul>
				{
					resumes.loaded
						? resumes.data.map(({ title, id }) => {
							return <li key={id}>
								<h2>{title}</h2>
								<div className='buttons'>
									<button
										data-tooltip-id="edit"
										data-tooltip-content="Edit"
									>
										<NavLink to={`/resumes/${id}`}><Pen /></NavLink>
									</button>
									<Tooltip id='edit' />
									<button
										data-tooltip-id="preview"
										data-tooltip-content="Preview"
									>
										<NavLink to={`/preview/${id}`}><Eye /></NavLink>
									</button>
									<Tooltip id='preview' />
									<button
										data-tooltip-id="clone"
										data-tooltip-content="Clone"
									><Copy /></button>
									<Tooltip id='clone' />
									<button
										data-tooltip-id="delete"
										data-tooltip-content="Delete"
									><Trash /></button>
									<Tooltip id='delete' />
								</div>
							</li>
						})
						: <>Loading</>
				}
			</ul>
		</main >
	)
}

export default Resumes