import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { usePopUpHelper } from '../../../../helpers/use_hooks/popup_helper';
import { API_HOST } from '../../../../helpers/global/global_config';
import { setRefresh } from '../../../../features/reducers/popup_response';
import ModalComponent from '../../../common/modal_component/modal_component';
import InputComponent from '../../../common/input_component/input_component/input_component';
import SelectComponent from '../../../common/input_component/select_component/select_component';
import { ALERT_ENUM, popupAlert } from '../../../../helpers/alert_response';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdMenu } from 'react-icons/md';
import TextAreaComponent from '../../../common/input_component/textarea_input_component/textarea_input_component';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useIsMounted } from '../../../../helpers/use_hooks/isMounted';

const DocumentRequirementsModalTest = ({
	isDisplay,
	onClose,
	data,
	remove,
	removeName,
}) => {
	const dispatch = useDispatch();
	const mounted = useIsMounted();
	const { renderBusy } = usePopUpHelper();
	const [category, setCategories] = useState([]);
	const [document, setDocument] = useState([]);
	const [grpID, setGrpID] = useState(0);
	const { refresh } = useSelector((state) => state.popupResponse);
	const getCategoryGroups = async () => {
		console.log(data);
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
		setCategories(groups);
	};
	useEffect(() => {
		getCategoryGroups();
	}, []);

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			document: document,
			doc_id: data?.doc_id ?? '',
			doc_group: data?.doc_group ?? '',
			doc_name: data?.doc_name ?? '',
		},
		validationSchema: Yup.object({
			document: Yup.array(),
			doc_name: Yup.string().when('document', {
				is: (document) => document.length === 0,
				then: Yup.string().required('This field is required'),
			}),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);
			value.doc_group = grpID;
			await axios
				.post(API_HOST + 'documentary-requirements', value)
				.then(() => {
					popupAlert({
						message: data?.grp_id
							? 'Document was edited'
							: 'Document was added',
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
	const getSelectedDocument = async (grp_id) => {
		let documentData = [];
		await axios
			.get(API_HOST + 'documentary-requirements/' + grp_id)
			.then((response) => {
				let categories = response.data.data;
				categories.forEach((data) => {
					let values = {
						doc_id: data.doc_id,
						doc_name: data.doc_name,
						bat_points: data.bat_points,
						doc_itm_order: data.doc_itm_order,
					};
					documentData.push(values);
				});
			})
			.catch((error) => {});
		setDocument(documentData);
	};
	useEffect(() => {
		getSelectedDocument(grpID);
	}, [grpID]);
	useEffect(() => {
		getSelectedDocument(data?.doc_group);
		setGrpID(data?.doc_group ?? 0);
		console.log(data);
	}, [isDisplay]);

	const handleAddChange = (type, value) => {
		setAddDataToArray({ ...addDataToArray, [type]: value });
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return;
		if (document.length !== 1) {
			const items = Array.from(document);
			const [recorded] = items.splice(result.source.index, 1);
			items.splice(result.destination.index, 0, recorded);
			setDocument([...items]);
		}
	};
	const [addDataToArray, setAddDataToArray] = useState({
		doc_name: '',
	});

	const handleArrayChange = (type, index, e) => {
		const { value } = e.target;
		setDocument((dataState) =>
			dataState?.map((list, i) => {
				return index === i ? { ...list, [type]: value } : { ...list };
			})
		);
	};

	const handleAdd = ({ doc_name }) => {
		let saver = 0;
		document.forEach((element) => {
			if (element.doc_itm_order >= saver) {
				saver = element.doc_itm_order;
			}
		});
		if (doc_name !== '') {
			setDocument([
				...document,
				{
					doc_itm_order: saver + 1,
					doc_name,
				},
			]);
			setAddDataToArray({
				doc_itm_order: '',
				doc_name: '',
			});
			form.setFieldValue('Document', document);
		}
	};

	const handleRemove = (item_id) => {
		setDocument(document.filter((item) => item.doc_itm_order !== item_id));
	};
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
					<div className='middle-input item-modal-5'>
						<label>Group/Category/Section</label>
						<SelectComponent
							name='doc_group'
							value={grpID}
							onChange={(e) => {
								setGrpID(e.target.value);
							}}
							itemList={category}
						/>
						{form.touched.doc_group && form.errors.doc_group ? (
							<span className='invalid-response'>{form.errors.doc_group}</span>
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
					{document.length > 0 && (
						<div style={{ marginTop: '6px' }}>
							<MdMenu
								style={{ paddingRight: '5px', opacity: '0' }}
								size='22px'
							/>
						</div>
					)}
					<div style={{ width: '50%', marginRight: '5px' }}>
						<label>Name/Type of Document</label>
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
									{document?.map(({ doc_itm_order, doc_name }, index) => {
										return (
											<Draggable
												key={doc_itm_order}
												draggableId={'droppable-' + doc_itm_order}
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
															<div style={{ width: '95%', marginRight: '5px' }}>
																<TextAreaComponent
																	value={doc_name}
																	onChange={(e) => {
																		handleArrayChange('doc_name', index, e);
																	}}
																/>
															</div>
															<div style={{ marginTop: '6px' }}>
																<AiOutlineMinusCircle
																	onClick={() => {
																		// dispatch(removeDutyResponsibility(id));
																		handleRemove(doc_itm_order);
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
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						{document.length > 0 && (
							<div style={{ marginTop: '6px' }}>
								<MdMenu
									style={{ paddingRight: '5px', opacity: '0' }}
									size='22px'
								/>
							</div>
						)}
						<div style={{ width: '95%', marginRight: '5px' }}>
							<TextAreaComponent
								name='doc_name'
								value={addDataToArray.doc_name}
								onChange={(e) => {
									handleAddChange('doc_name', e.target.value);
									form.handleChange(e);
								}}
							/>
							{form.touched.doc_name && form.errors.doc_name ? (
								<p className='error-validation-styles'>
									{form.errors.doc_name}
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
export default DocumentRequirementsModalTest;
