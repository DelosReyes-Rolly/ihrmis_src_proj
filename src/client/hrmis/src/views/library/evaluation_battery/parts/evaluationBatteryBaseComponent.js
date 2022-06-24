import React from 'react';
import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb.js';
import { libraryEvaluationBatteryBreadCrumbs } from '../../../rsp_module/plantilla/static/breadcramp_data.js';
import EvaluationBatteryTable from './evaluationBatteryTable';

const EvaluationBatteryBaseComponent = ({}) => {
	return (
		<div>
			<BreadcrumbComponent
				list={libraryEvaluationBatteryBreadCrumbs}
				className=''
			/>
			<div className='container-vacant-position'>
				<div className='regular-tab-component'>
					<div className='reg-tab-container '>
						<button className={'reg-tab-activate'}>Evaluation Battery</button>
					</div>
				</div>
				<hr className='solid' />
			</div>
			<div>
				<EvaluationBatteryTable />
			</div>
		</div>
	);
};

export default EvaluationBatteryBaseComponent;
