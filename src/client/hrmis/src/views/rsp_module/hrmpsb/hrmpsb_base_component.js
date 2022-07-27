import { Outlet } from 'react-router-dom';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDetectScreenHelper } from '../../../helpers/use_hooks/detect_screen_helper';
import NavbarComponent from '../../common/navbar_component/Navbar';
import { openSideBar } from '../../../features/reducers/mobile_view_slice';
import FooterComponent from '../../common/footer_components/Footer';

const HRMPSB = () => {
	const isNavbarEnable = useSelector((state) => state.mobileView.sidebar);
	const dispatch = useDispatch();
	const { isMobile } = useDetectScreenHelper();
	return (
		<React.Fragment>
			<div className='App'>
				<NavbarComponent />

				<div className='container'>
					{/* This div is for shaded part of mobile sidebar*/}
					<div style={{ width: '100%', height: '94.5vh' }}>
						{isMobile && isNavbarEnable && (
							<div
								style={{
									position: 'fixed',
									backgroundColor: '#00000030',
									width: '100%',
									height: '100%',
									zIndex: 99,
								}}
								onClick={() => dispatch(openSideBar())}
							></div>
						)}
						<Outlet />
					</div>
				</div>
				<div>
					<FooterComponent />
				</div>
			</div>
		</React.Fragment>
	);
};

export default HRMPSB;
