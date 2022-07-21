import React from 'react';
import {
	AiOutlineHome,
	AiOutlineEdit,
	AiOutlineUser,
	AiOutlineWallet,
	AiOutlineFileSearch,
} from 'react-icons/ai';
import { IoAlbumsOutline } from 'react-icons/io5';

export const SidebarOption = [
	{
		title: 'Dashboard',
		id: 1,
		icon: <AiOutlineHome size='20' />,
		more: null,
		link: '/rsp/dashboard',
	},
	{
		title: 'Request',
		id: 2,
		icon: <AiOutlineEdit size='20' />,
		more: null,
		link: '/rsp/request',
	},
	{
		title: 'Plantilla',
		id: 3,
		icon: <AiOutlineUser size='20' />,
		more: [
			{
				id: 1,
				title: 'Employee',
				link: '/rsp/plantilla/employee',
			},
			{
				id: 2,
				title: 'Plantilla Items',
				link: '/rsp/plantilla/plantilla-items',
			},
		],
		link: '/rsp/plantilla',
	},
	{
		title: 'Recruitment',
		id: 6,
		icon: <AiOutlineFileSearch size='20' />,
		more: [
			{
				id: 1,
				title: 'Applicants',
				link: '/rsp/recruitment',
			},
			{
				id: 2,
				title: 'Onboarding',
				link: '/rsp/onboarding',
			},
		],
		link: '/rsp/recruitment',
	},
	{
		title: 'Compensation',
		id: 7,
		icon: <AiOutlineWallet size='20' />,
		more: null,
		link: '/rsp/compensation',
	},
	{
		title: 'Library',
		id: 8,
		icon: <IoAlbumsOutline size='20' />,
		more: [
			{
				id: 1,
				title: 'Office / Agency',
				link: '/library/office',
			},
			{
				id: 2,
				title: 'Category Groups',
				link: '/library/category-groups',
			},
			{
				id: 3,
				title: 'Documentary Requirements',
				link: '/library/documentary-requirements',
			},
			{
				id: 4,
				title: 'Evaluation Battery',
				link: '/library/evaluation-battery',
			},
			{
				id: 5,
				title: 'Email Templates',
				link: '/rsp/plantilla/plantilla-items',
			},
			{
				id: 6,
				title: 'Civil Service Position',
				link: '/library/position-csc-library',
			},
			{
				id: 7,
				title: 'Service History',
				link: '/library/service-history',
			},
			{
				id: 8,
				title: 'User Accounts',
				link: '/library/user-accounts',
			},
		],
		link: '/library',
	},
];
