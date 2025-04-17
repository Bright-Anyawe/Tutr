import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UploadButton, StudioButton, SearchButton } from './ActionButtons';
import '../../styles/searchForm.css';

function SearchForm() {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    
    // Check if we're on a studio-related page
    const isStudioPage = location.pathname.includes('/studio');
    
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search logic here
        console.log('Searching for:', searchQuery);
    };
    
    return (
        <div className='search-form-container'>
            <form 
                className="search-container" 
                onSubmit={handleSearchSubmit}
                role="search"
            >
                <div className="search-input">
                    <input
                        type="text"
                        className="search-field"
                        placeholder="What do you want to teach today?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search teaching topics"
                    />
                </div>

                <div className="search-actions">
                    <div className="action-buttons">
                        <UploadButton />
                        {!isStudioPage && <StudioButton />}
                    </div>

                    <SearchButton searchQuery={searchQuery} />
                </div>
            </form>
        </div>
    );
}

export default SearchForm;
