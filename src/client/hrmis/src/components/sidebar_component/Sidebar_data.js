import React from 'react';
import { AiOutlineHome, AiOutlineEdit, AiOutlineUser, AiOutlineWallet, AiOutlineFileSearch} from 'react-icons/ai';

export const SidebarOption =[
    {
        title: 'Dashboard',
        id: 1,
        icon: <AiOutlineHome size="20"/>,
        more: null,
        link: '/',
    },
    {
        title: 'Request',
        id: 2,
        icon: <AiOutlineEdit size="20"/>,
        more: null,
        link: '/request',
        
    },
    {
        title: 'Plantilla',
        id: 3,
        icon: <AiOutlineUser size="20"/>,
        more: [
            {
                id: 1, 
                title: 'Employee',
            },
            {
                id: 2, 
                title: 'Plantilla Items',
            }
        ],
        link: '/plantilla/plantilla-items',
    },
    {
        title: 'Recruitment',
        id: 4,
        icon: <AiOutlineFileSearch size="20"/>,
        more: null,
        link: '/recruitment',
    },
    {
        title: 'Compensation',
        id: 5,
        icon: <AiOutlineWallet size="20"/>,
        more: null,
        link: '/compensation',
    },
];