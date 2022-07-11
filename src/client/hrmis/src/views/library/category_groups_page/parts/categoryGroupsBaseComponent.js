import React from 'react';
import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb.js';
import { libraryCategoryGroupsBreadCrumbs } from '../../../rsp_module/plantilla/static/breadcramp_data.js';
import CategoryGroupsTable from './categoryGroupsTable.js';

const CategoryGroupsBaseComponent = () => {
	return (
		<div>
			<BreadcrumbComponent
				list={libraryCategoryGroupsBreadCrumbs}
				className=''
			/>
			<div className='container-vacant-position'>
				<div className='regular-tab-component'>
					<div className='reg-tab-container '>
						<button className={'reg-tab-activate'}>Category Groups</button>
					</div>
				</div>
				<hr className='solid' />
			</div>
			<div>
				<CategoryGroupsTable />
			</div>
		</div>
	);
};

export default CategoryGroupsBaseComponent;
