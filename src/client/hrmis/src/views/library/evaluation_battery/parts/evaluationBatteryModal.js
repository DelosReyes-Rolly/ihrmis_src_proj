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
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdMenu } from 'react-icons/md';
import { SGType } from '../static/input_items';
import TextAreaComponent from '../../../common/input_component/textarea_input_component/textarea_input_component';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const EvaluationBatteryModal = ({
	isDisplay,
	onClose,
	data,
	remove,
	removeName,
}) => {
	const dispatch = useDispatch();
	const { renderBusy } = usePopUpHelper();
	const [category, setCategories] = useState([]);
	const [battery, setBattery] = useState([]);
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
		setCategories(groups);
	};
	useEffect(() => {
		getCategoryGroups();
	}, []);

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			battery: battery,
			bat_id: data?.bat_id ?? '',
			bat_name: data?.bat_name ?? '',
			bat_points: data?.bat_points ?? '',
			bat_sg_type: data?.bat_sg_type ?? '',
			bat_grp_id: data?.bat_grp_id ?? '',
		},
		validationSchema: Yup.object({
			battery: Yup.array(),
			bat_name: Yup.string().when('battery', {
				is: (battery) => battery.length === 0,
				then: Yup.string().required('This field is required'),
			}),
			bat_points: Yup.number().when('battery', {
				is: (battery) => battery.length === 0,
				then: Yup.number().required('This field is required'),
			}),
			bat_sg_type: Yup.number()
				.typeError('Must be a number')
				.max(999)
				.required('This field is required'),
			bat_grp_id: Yup.number()
				.typeError('Must be a number')
				.max(999)
				.required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			await axios
				.post(API_HOST + 'evaluation-battery', value)
				.then(() => {
					popupAlert({
						message: data?.grp_id ? 'Battery was edited' : 'Battery was added',
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
	const getSelectedBattery = async (grp_id, sg) => {
		let batteryData = [];
		await axios
			.get(API_HOST + 'evaluation-battery/' + grp_id + '/' + sg)
			.then((response) => {
				let categories = response.data.data;
				categories.forEach((data) => {
					let values = {
						bat_id: data.bat_id,
						bat_name: data.bat_name,
						bat_points: data.bat_points,
						bat_itm_order: data.bat_itm_order,
					};
					batteryData.push(values);
				});
			})
			.catch((error) => {});
		setBattery(batteryData);
		form.setFieldValue('bat_grp_id', grp_id);
		form.setFieldValue('bat_sg_type', sg);
	};
	useEffect(() => {
		getSelectedBattery(data?.bat_grp_id, data?.bat_sg_type);
	}, []);
	const handleAddChange = (type, value) => {
		setAddDataToArray({ ...addDataToArray, [type]: value });
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return;
		if (battery.length !== 1) {
			const items = Array.from(battery);
			const [recorded] = items.splice(result.source.index, 1);
			items.splice(result.destination.index, 0, recorded);
			setBattery([...items]);
		}
	};
	const [addDataToArray, setAddDataToArray] = useState({
		bat_name: '',
		bat_points: '',
	});

	const handleArrayChange = (type, index, e) => {
		const { value } = e.target;
		setBattery((dataState) =>
			dataState?.map((list, i) => {
				return index === i ? { ...list, [type]: value } : { ...list };
			})
		);
	};

	const handleAdd = ({ bat_name, bat_points }) => {
		let saver = 0;
		battery.forEach((element) => {
			if (element.bat_itm_order >= saver) {
				saver = element.bat_itm_order;
			}
		});
		if (bat_name !== '') {
			if (bat_points !== '') {
				setBattery([
					...battery,
					{
						bat_itm_order: saver + 1,
						bat_name,
						bat_points,
					},
				]);
				setAddDataToArray({
					bat_itm_order: '',
					bat_name: '',
					bat_points: '',
				});
				form.setFieldValue('battery', battery);
			}
		}
	};

	const handleRemove = (item_id) => {
		setBattery(battery.filter((item) => item.bat_itm_order !== item_id));
	};
	return (
		<React.Fragment>
			<ModalComponent
				title='Evaluation Battery'
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
						<label>Group/Category/Section</label>
						<SelectComponent
							name='bat_grp_id'
							value={form.values.bat_grp_id}
							onChange={(e) => {
								
								getSelectedBattery(e.target.value, form.values.bat_sg_type);
							}}
							itemList={category}
						/>
						{form.touched.bat_grp_id && form.errors.bat_grp_id ? (
							<span className='invalid-response'>{form.errors.bat_grp_id}</span>
						) : null}
					</div>
					<div className='middle-input item-modal-2'>
						<label>Salary Grade</label>
						<SelectComponent
							name='bat_sg_type'
							value={form.values.bat_sg_type}
							onChange={(e) => {
								getSelectedBattery(form.values.bat_grp_id, e.target.value);
								form.setFieldValue('bat_sg_type', e.target.value);
							}}
							itemList={SGType}
						/>
						{form.touched.bat_sg_type && form.errors.bat_sg_type ? (
							<span className='invalid-response'>
								{form.errors.bat_sg_type}
							</span>
						) : null}
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						marginBottom: '-10px',
						marginTop: '10px',
						marginLeft: '5px',
					}}
				>
					{battery.length > 0 && (
						<div style={{ marginTop: '6px' }}>
							<MdMenu
								style={{ paddingRight: '5px', opacity: '0' }}
								size='22px'
							/>
						</div>
					)}
					<div style={{ width: '50%', marginRight: '5px' }}>
						<label>Battery</label>
					</div>
					<div
						style={{
							width: '50%',
							marginRight: '5px',
							marginLeft: '5px',
						}}
					>
						<label>Points</label>
					</div>
					<div style={{ marginTop: '6px' }}>
						<AiOutlineMinusCircle
							style={{ color: '#00000000', paddingLeft: '5px' }}
							className='button-add-remove'
							size='22px'
						/>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginBottom: '-10px',
						marginTop: '10px',
						marginLeft: '5px',
					}}
				>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId='droppable'>
							{(provided, snapshot) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									style={{ display: 'flex', flexDirection: 'column' }}
								>
									{battery.map(
										({ bat_itm_order, bat_name, bat_points }, index) => {
											return (
												<Draggable
													key={bat_itm_order}
													draggableId={'droppable-' + bat_itm_order}
													index={index}
												>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<div
																style={{
																	display: 'flex',
																	flexDirection: 'row',
																}}
															>
																<div style={{ marginTop: '6px' }}>
																	<MdMenu
																		style={{ paddingRight: '5px' }}
																		size='22px'
																	/>
																</div>
																<div
																	style={{ width: '50%', marginRight: '5px' }}
																>
																	<TextAreaComponent
																		value={bat_name}
																		onChange={(e) => {
																			handleArrayChange('bat_name', index, e);
																		}}
																	/>
																</div>
																<div
																	style={{
																		width: '40%',
																		marginRight: '5px',
																		marginLeft: '5px',
																	}}
																>
																	<InputComponent
																		value={bat_points}
																		type='number'
																		onChange={(e) => {
																			handleArrayChange('bat_points', index, e);
																		}}
																	/>
																</div>
																<div style={{ marginTop: '6px' }}>
																	<AiOutlineMinusCircle
																		onClick={() => {
																			// dispatch(removeDutyResponsibility(id));
																			handleRemove(bat_points);
																		}}
																		style={{ color: 'red', paddingLeft: '5px' }}
																		className='button-add-remove'
																		size='22px'
																	/>
																</div>
															</div>
														</div>
													)}
												</Draggable>
											);
										}
									)}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						{battery.length > 0 && (
							<div style={{ marginTop: '6px' }}>
								<MdMenu
									style={{ paddingRight: '5px', opacity: '0' }}
									size='22px'
								/>
							</div>
						)}
						<div style={{ width: '50%', marginRight: '5px' }}>
							<TextAreaComponent
								name='dty_itm_desc'
								value={addDataToArray.bat_name}
								onChange={(e) => {
									handleAddChange('bat_name', e.target.value);
									form.handleChange(e);
								}}
							/>
							{form.touched.bat_name && form.errors.bat_name ? (
								<p className='error-validation-styles'>
									{form.errors.bat_name}
								</p>
							) : null}
						</div>
						<div
							style={{ width: '40%', marginRight: '5px', marginLeft: '5px' }}
						>
							<InputComponent
								name='dty_itm_percent'
								value={addDataToArray.bat_points}
								type='number'
								onChange={(e) => {
									handleAddChange('bat_points', e.target.value);
									form.handleChange(e);
								}}
							/>
							{form.touched.bat_points && form.errors.bat_points ? (
								<p className='error-validation-styles'>
									{form.errors.bat_points}
								</p>
							) : null}
						</div>
						<div style={{ marginTop: '6px' }}>
							<AiOutlinePlusCircle
								onClick={() => {
									// dispatch(removeDutyResponsibility(id));
									handleAdd(addDataToArray);
								}}
								style={{ color: 'green', paddingLeft: '5px' }}
								className='button-add-remove'
								size='22px'
							/>
						</div>
					</div>
				</div>
			</ModalComponent>
		</React.Fragment>
	);
};
export default EvaluationBatteryModal;
