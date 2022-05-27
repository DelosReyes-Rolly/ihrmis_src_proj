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
				id: 4,
				title: 'Employee',
				link: '/rsp/plantilla/employee',
			},
			{
				id: 5,
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
		more: null,
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
				id: 9,
				title: 'Offices',
				link: '/library/office',
			},
			{
				id: 10,
				title: 'Documentary Requirements',
				link: '/rsp/plantilla/plantilla-items',
			},
      {
				id: 11,
				title: 'Email Templates',
				link: '/rsp/plantilla/plantilla-items',
			},
      {
				id: 12,
				title: 'Positions',
				link: '/rsp/plantilla/plantilla-items',
			},
		],
		link: '/rsp/library',
	},
];
