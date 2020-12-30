import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarItems = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'Playlists',
        path: '/playlists',
        icon: <IoIcons.IoMdAlbums />,
    },
    {
        title: 'Customization',
        path: '/customization',
        icon: <AiIcons.AiFillSetting />,
    },
]