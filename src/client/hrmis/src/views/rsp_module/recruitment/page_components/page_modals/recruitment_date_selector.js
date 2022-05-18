import React, { useEffect, useState } from 'react';
import ModalComponent from '../../../../common/modal_component/modal_component';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import InputComponent from '../../../../common/input_component/input_component/input_component';
import { API_HOST } from '../../../../../helpers/global/global_config';
import SelectComponent from '../../../../common/input_component/select_component/select_component';
import { monthSelectItem } from '../../static/menu_items';

const RecruitmentDateSelector = ({ isDisplay, onClose, title }) => {
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');

	let years = [];
	let i = 2000;
	for (i = 2000; i <= new Date().getFullYear(); i++) {
		let temp = {
			id: i,
			title: i,
		};
		years.push(temp);
	}

	const submitDate = () => {
		if (selectedMonth !== '' && selectedYear !== '') {
			window.open(
				API_HOST + 'generate-RAI/' + selectedMonth + '/' + selectedYear
			);
		}
	};

	return (
		<React.Fragment>
			<ModalComponent
				onSubmit={() => submitDate()}
				title={title}
				isDisplay={isDisplay}
				onSubmitType='submit'
				onClose={onClose}
				onSubmitName='Send'
			>
				<div className='add-office-modal'>
					<div className='left-input item-modal-5'>
						<label>Month</label>
						<SelectComponent
							name='month_selector'
							value={selectedMonth}
							onChange={(e) => {
								setSelectedMonth(e.target.value);
								console.log(selectedMonth);
							}}
							itemList={monthSelectItem}
						/>
					</div>
					<div className='right-input item-modal-5'>
						<label>Year</label>
						<SelectComponent
							name='year_selector'
							value={selectedYear}
							onChange={(e) => {
								setSelectedYear(e.target.value);
								console.log(selectedYear);
							}}
							itemList={years}
						/>
					</div>
				</div>
				<br />
			</ModalComponent>
		</React.Fragment>
	);
};

export default RecruitmentDateSelector;
