import React from 'react'
import "./Sidebar.css";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar,IconButton } from '@mui/material';
import SidebarChat from './SidebarChat';
function Sidebar() {
return (
<div className='sidebar'>

    <div class="sidebar_header">
        <Avatar
            src="https://avatars.githubusercontent.com/u/89971045?s=400&u=f67fc032815039900ae416aa5fe3e20706b1c2ca&v=4" />
        <div class="sidebar_headerRight">
            <IconButton>
                <DonutLargeIcon />
            </IconButton>
            <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>

        </div>
    </div>
    <div class="sidebar_search">
        <div class="sidebar_searchContainer">
<SearchIcon/>
<input placeholder="Search or start new chat" type="text"/>
        </div>
    </div>
    <div class="sidebar_chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat/>

    </div>
</div>
)
}

export default Sidebar