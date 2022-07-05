import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper';
import { API_HOST } from '../../../../helpers/global/global_config';
import { setRefresh } from '../../../../features/reducers/popup_response';
import ModalComponent from '../../../common/modal_component/modal_component';
import InputComponent from '../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../common/input_component/select_component/select_component';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';

const DocumentaryRequirementsModal = ({
	isDisplay,
	onClose,
	data,
	remove,
	removeName,
}) => {
	const mounted = useIsMounted();
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const [categoryGroup, setCategoryGroup] = useState([]);
	const getCategoryGroups = async () => {
		let groups = [];
		await axios
			.get(API_HOST + 'category-groups')
			.then((response) => {
				let categories = response.data.data;
				categories.forEach((data) => {
					let obj = {};
					obj['id'] = data.grp_id;
					obj['title'] = data.grp_name;
					groups.push(obj);
				});
			})
			.catch((error) => {});
		if (!mounted.current) return;
		setCategoryGroup(groups);
	};
	useEffect(() => {
		getCategoryGroups();
	}, []);
	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			doc_id: data?.doc_id ?? '',
			doc_name: data?.doc_name ?? '',
			doc_group: data?.doc_group ?? '',
		},
		validationSchema: Yup.object({
			doc_name: Yup.string()
				.required('This field is required')
				.max(191, 'Invalid input'),
			doc_group: Yup.number()
				.typeError('Must be a number')
				.max(999)
				.required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			await axios
				.post(API_HOST + 'documentary-requirements', value)
				.then(() => {
					popupAlert({
						message: data?.doc_id
							? 'Documentary Requirement was edited'
							: 'Documentary Requirement was added',
						type: ALERT_ENUM.success,
					});
					dispatch(setRefresh());
				})
				.catch((err) => {
					popupAlert({
						message: err.message,
						type: ALERT_ENUM.fail,
					});
				});
			renderBusy(false);
			onClose();
			resetForm();
		},
	});

	return (
		<React.Fragment>
			<ModalComponent
				title='Documentary Requirements'
				onSubmitName='Save'
				onCloseName={removeName}
				onPressed={remove}
				isDisplay={isDisplay}
				onSubmit={form.handleSubmit}
				onSubmitType='submit'
				onClose={onClose}
			>
				<div className='add-office-modal'>
					<div className='middle-input item-modal-1'>
						<label>Document Name</label>
						<InputComponent
							name='doc_name'
							value={form.values.doc_name}
							onChange={form.handleChange}
							maxLength='30'
						/>
						{form.touched.doc_name && form.errors.doc_name ? (
							<span className='invalid-response'>{form.errors.doc_name}</span>
						) : null}
					</div>
					<div className='right-input item-modal-1'>
						<label>Document Group</label>
						<SelectComponent
							name='doc_group'
							value={form.values.doc_group}
							onChange={(e) => {
								form.handleChange(e);
							}}
							itemList={categoryGroup}
						/>
						{form.touched.doc_group && form.errors.doc_group ? (
							<span className='invalid-response'>{form.errors.doc_group}</span>
						) : null}
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};
export default DocumentaryRequirementsModal;
