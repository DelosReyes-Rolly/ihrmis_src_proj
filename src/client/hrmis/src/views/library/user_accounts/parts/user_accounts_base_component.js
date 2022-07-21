import React from 'react';
import BreadcrumbComponent from '../../../common/breadcrumb_component/Breadcrumb.js';
import { libraryUserAcouuntsBreadCrumbs } from '../../../rsp_module/plantilla/static/breadcramp_data.js';
import UserAccountsTable from './user_accounts_table.js';

const UserAccountsBaseComponent = () => {
	return (
		<div>
			<BreadcrumbComponent list={libraryUserAcouuntsBreadCrumbs} className='' />
			<div className='container-vacant-position'>
				<div className='regular-tab-component'>
					<div className='reg-tab-container '>
						<button className={'reg-tab-activate'}>User Accounts</button>
					</div>
				</div>
				<hr className='solid' />
			</div>
			<div>
				<UserAccountsTable />
			</div>
		</div>
	);
};

export default UserAccountsBaseComponent;
