import BreadcrumbConfig, {
	crumbSecondLevel,
} from '../../../router/breadcrumb_config';
const DashboardView = ({}) => {
	const { getSecondLevel } = crumbSecondLevel();
	return (
		<div>
			<BreadcrumbConfig array={getSecondLevel(1)} />
			<div style={{ margin: 20 }}>
				<div className=''>
					Welcome <strong>Jessica Moral!</strong>
				</div>
				<br />
        <h1>Dashboard View</h1>
			</div>
		</div>
	);
};

export default DashboardView;
