import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'
import './ReadPosts.css';

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('created_at');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {

        const fetchPosts = async () => {
            const {data} = await supabase
            .from('Posts')
            .select()
            .order(sortCriteria, { ascending: false });

            // set state of posts
            setPosts(data);
        }
        
        fetchPosts();
    }, [sortCriteria, props]);
    
    const handleSortChange = (criteria) => {
        setSortCriteria(criteria);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPosts = posts.filter(post =>
        post.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="ReadPosts">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            
            <div className="sort-options">
                <span>Order By: </span>
                <button onClick={() => handleSortChange('created_at')}>Most Recent</button>
                <button onClick={() => handleSortChange('likeCount')}>Most Upvotes</button>
            </div>
            
            <div className="posts-list">
                {filteredPosts && filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Card
                            key={post.id}
                            id={post.id}
                            name={post.name}
                            genre={post.genre}
                            personal_thoughts={post.personal_thoughts}
                        />
                    ))
                ) : (
                    <h2>No Challenges Yet 😞</h2>
                )}
            </div>
        </div>
    );
};

export default ReadPosts;