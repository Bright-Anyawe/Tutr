import React, { useState } from 'react';
import BreadcrumbNav from '../components/BreadcrumbNav';

import '../styles/layouts/StudioPageLayout.css';
import Header from '~/layouts/Header';
import Sidebar from '~/layouts/SideBar';

const UserProfileLayout: React.FC = () => {

    return (
        <div>
            <Header />
            <BreadcrumbNav />
            <div className="user-profile-layout">
                <div className="user-profile-sidebar">
                </div>
            </div>
        </div>
    );
};

export default UserProfileLayout; 