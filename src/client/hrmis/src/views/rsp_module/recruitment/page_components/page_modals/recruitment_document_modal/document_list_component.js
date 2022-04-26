import React, { useEffect, useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import ReactTooltip from 'react-tooltip';
import { API_HOST } from '../../../../../../helpers/global/global_config';
import IconComponent from '../../../../../common/icon_component/icon';

const DocumentListComponent = ({
	documentRequirements,
	uploadedRequirements,
}) => {
	const requirements = documentRequirements.documentRequirements ?? [];
	const [otherDocs, setOtherDocs] = useState([]);

	const filterUploadedfromRequirements = () => {
		let uploadedDocs = uploadedRequirements.uploadedRequirements;
		let tempDocs = [];

		uploadedDocs.forEach((element) => {
			let temp = requirements.some((check) => check.title === element.title);
			if (!temp && element.id != null) {
				tempDocs.push({
					id: element.id,
					title: element.title,
					filled: true,
				});
				setOtherDocs(tempDocs);
			} else {
				setOtherDocs([]);
			}
			let index = requirements.findIndex((object) => {
				return object.id === element.id;
			});
			if (index !== -1) {
				requirements[index].filled = true;
			} else {
				requirements.forEach((value) => {
					value.filled = false;
				});
			}
		});
	};
	useEffect(() => {
		filterUploadedfromRequirements();
	}, [uploadedRequirements]);
	return (
		<React.Fragment>
			<table className='documents_table'>
				<tbody>
					<TableList data={requirements ?? []} />
					{console.log(otherDocs)}
					<TableList data={otherDocs ?? []} />
				</tbody>
			</table>
		</React.Fragment>
	);
};

export default DocumentListComponent;

const TableList = ({ data }) => {
	return (
		<React.Fragment>
			{data.map((element) => {
				if (element.title === 'Other Documents') return null;
				return (
					<tr key={element.id}>
						<td
							id={'document_text'}
							data-tip
							data-for={'rc-dc-txt' + element.id}
							onClick={() => {
								window.open(API_HOST, '_blank');
							}}
							className={element.filled === false ? 'col-1 unfilled' : 'col-1'}
						>
							<ReactTooltip
								id={'rc-dc-txt' + element.id}
								place='top'
								effect='solid'
							>
								Open {element.title} in another Window
							</ReactTooltip>
							{element.title}
						</td>
						<td className='col-2'>
							<IconComponent
								id={'delete ' + element.id}
								className='padding-left-1 point'
								icon={<BsTrashFill />}
								position='top'
								toolTipId={'rc-vp-mail-' + element.id}
								textHelper={'Delete this file?'}
								onClick={() => {
									// modalToggle();
								}}
							/>
						</td>
					</tr>
				);
			})}
		</React.Fragment>
	);
};
