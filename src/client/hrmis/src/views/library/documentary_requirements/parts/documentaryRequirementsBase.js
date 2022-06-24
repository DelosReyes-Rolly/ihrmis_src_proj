import React from 'react';
import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb.js';
import { libraryDocumentRequirementsBreadCrumbs } from '../../../rsp_module/plantilla/static/breadcramp_data.js';
import DocumentaryRequirementsTable from './documentaryRequirementsTable';

const DocumentRequirementsBase = ({}) => {
	return (
		<div>
			<BreadcrumbComponent
				list={libraryDocumentRequirementsBreadCrumbs}
				className=''
			/>
			<div className='container-vacant-position'>
				<div className='regular-tab-component'>
					<div className='reg-tab-container '>
						<button className={'reg-tab-activate'}>Documentary Requirements</button>
					</div>
				</div>
				<hr className='solid' />
			</div>
			<div>
				<DocumentaryRequirementsTable />
			</div>
		</div>
	);
};

export default DocumentRequirementsBase;
