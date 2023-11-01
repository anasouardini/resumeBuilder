import React from 'react';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import { Trash, Copy, Eye, Pen, Pencil } from 'lucide-react';
import serverFetch from '../utils/serverFetch';
import { Tooltip } from 'react-tooltip';

interface Resume {
	id: string,
	title: string,
	components: [
		{
			name: string,
			type: string,
			order: number,
			color: string,
			value: string,
		},
		{
			name: string,
			type: string,
			order: number,
			color: string,
			value: string,
		},
		{
			name: string,
			type: string,
			order: number,
			color: string,
			value: number
		}
	]
}

const useResumesList = () => {
	const [resumes, setResumes] = React.useState<Resume[]>([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [err, setErr] = React.useState(false);
	React.useEffect(() => {
		setTimeout(() => {
			const res = serverFetch('read', '/resumes')
				.then((res) => {
					setIsLoading(false);
					// cealn up: converting object to an array and removing last item (response status).
					setResumes(Object.values(res).slice(0, -1));
				})
				.catch((err) => setErr(true));
		}, 1000);
	}, [])

	// console.log(resumes)
	return { isLoading, err, resumes };
}

interface ResumeProps { }
const Resumes = ({ }: ResumeProps) => {

	const { isLoading, err, resumes } = useResumesList();
	// console.log(resumes)

	return (
		<main className='container resumes-page'>
			{/* <h1>Resumes</h1> */}
			<ul>
				{
					!err
						? !isLoading
							? resumes.map(({ title, id }) => {
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
							: <>Loading...</>
						: <>There was an error getting resumes list</>
				}
			</ul>
		</main >
	)
}

export default Resumes