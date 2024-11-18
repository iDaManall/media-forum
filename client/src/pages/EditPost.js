import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, name: "", genre: "", personal_thoughts: "", imageUrl: ""});

    useEffect(() => {
        const fetchPost = async () => {
          const { data, error } = await supabase
            .from('Posts')
            .select('*')
            .eq('id', id)
            .single();
    
          if (error) {
            console.error('Error fetching post:', error);
          } else {
            setPost(data);
          }
        };
    
        fetchPost();
      }, [id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    };

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
        .from('Posts')
        .update({ name: post.name, genre: post.genre, personal_thoughts: post.personal_thoughts, imageUrl: post.imageUrl })
        .eq('id', id);

        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('Posts')
        .delete()
        .eq('id', id);

        window.location = "http://localhost:3000/";
    }

    return (
        <div>
            <form>
                <label for="name">Title</label> <br />
                <input type="text" id="name" name="name" value={post.name} onChange={handleChange} /><br />
                <br/>

                <label for="genre">Genre</label><br />
                <div className="radio-group">
                <label htmlFor="anime">
                    <input type="radio" id="anime" name="genre" value="Anime" checked={post.genre === 'Anime'} onChange={handleChange} />
                    Anime
                </label>
                <label htmlFor="indie">
                    <input type="radio" id="indie" name="genre" value="Indie Film" checked={post.genre === 'Indie Film'} onChange={handleChange} />
                    Indie Film
                </label>
                <label htmlFor="hollywood">
                    <input type="radio" id="hollywood" name="genre" value="Hollywood" checked={post.genre === 'Hollywood'} onChange={handleChange} />
                    Hollywood
                </label>
                <label htmlFor="bollywood">
                    <input type="radio" id="bollywood" name="genre" value="Bollywood" checked={post.genre === 'Bollywood'} onChange={handleChange} />
                    Bollywood
                </label>
                <label htmlFor="manga">
                    <input type="radio" id="manga" name="genre" value="Manga" checked={post.genre === 'Manga'} onChange={handleChange} />
                    Manga
                </label>
                <label htmlFor="webtoon">
                    <input type="radio" id="webtoon" name="genre" value="Webtoon" checked={post.genre === 'Webtoon'} onChange={handleChange} />
                    Webtoon
                </label>
                <label htmlFor="game">
                    <input type="radio" id="game" name="genre" value="Videogame" checked={post.genre === 'Videogame'} onChange={handleChange} />
                    Videogame
                </label>
                <label htmlFor="book">
                    <input type="radio" id="book" name="genre" value="Book" checked={post.genre === 'Book'} onChange={handleChange} />
                    Book
                </label>
                <label htmlFor="eastern">
                    <input type="radio" id="eastern" name="genre" value="Eastern Film" checked={post.genre === 'Eastern Film'} onChange={handleChange} />
                    Eastern Film
                </label>
                <label htmlFor="other">
                    <input type="radio" id="other" name="genre" value="Other" checked={post.genre === 'Other'} onChange={handleChange} />
                    Other
                </label>
                </div>
                <br/>

                <label htmlFor="imageUrl">Image URL (optional)</label><br />
                <input type="text" id="imageUrl" name="imageUrl" value={post.imageUrl} onChange={handleChange} /><br />
                <br />

                <label for="personal_thoughts">Personal Thoughts</label><br />
                <textarea rows="5" cols="50" id="personal_thoughts" name="personal_thoughts" value={post.personal_thoughts} onChange={handleChange} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost;