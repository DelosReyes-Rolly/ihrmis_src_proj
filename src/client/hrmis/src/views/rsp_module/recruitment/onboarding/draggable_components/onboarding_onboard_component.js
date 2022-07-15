import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BiGridVertical } from 'react-icons/bi';
import OnboardingAccordion from './onboarding_accordion';
import { usePopUpHelper } from '../../../../../helpers/use_hooks/popup_helper';
import { useIsMounted } from '../../../../../helpers/use_hooks/isMounted';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const OnBoardingComponent = () => {
	const mounted = useIsMounted();
	const { renderBusy, renderFailed, renderSucceed } = usePopUpHelper();
	const dispatch = useDispatch();

	const [fakeSection, setFakeSection] = useState([
		{ title: 'sectionName1', id: '1' },
		{ title: 'sectionName2', id: '2' },
		{ title: 'sectionName3', id: '3' },
	]);
	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			section_name: '',
			section_order: '',
		},
		validationSchema: Yup.object({
			doc_type: Yup.number()
				.typeError('Must be a number')
				.required('This field is required'),
			doc_name: Yup.string().typeError('Must be Text'),
			documents: Yup.string().required('This field is required'),
		}),
		onSubmit: async (value, { resetForm }) => {
			renderBusy(true);

			// await axios
			// 	.post(API_HOST + 'new-requirement/' + rowData.app_id, formData, {
			// 		headers: { 'Content-Type': 'multipart/form-data' },
			// 	})
			// 	.then((res) => {
			// 		popupAlert({
			// 			message: 'Document saved successfully',
			// 			type: ALERT_ENUM.success,
			// 		});
			// 		dispatch(setRefresh());
			// 	})
			// 	.catch((err) => {
			// 		popupAlert({
			// 			message: 'Document failed to save',
			// 			type: ALERT_ENUM.fail,
			// 		});
			// 	});
			renderBusy(false);
		},
	});
	useEffect(() => {
		console.table(fakeSection);
	}, []);
	return (
		<React.Fragment>
			<DragDropContext>
				<Droppable droppableId='droppable'>
					{(provided) => {
						fakeSection?.map((data, key) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								<OnboardingAccordion
									title={data.title}
									id={data.id}
									key={key}
								/>
							</div>
						));
					}}
				</Droppable>
			</DragDropContext>
		</React.Fragment>
	);
};

export default OnBoardingComponent;
