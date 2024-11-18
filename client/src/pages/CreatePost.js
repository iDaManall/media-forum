import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client';

const CreatePost = () => {

    const [post, setPost] = useState({name: "", genre: "", personal_thoughts: "", imageUrl: "" })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        });
    }

    const createPost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .insert({name: post.name, genre: post.genre, personal_thoughts: post.personal_thoughts, imageUrl: post.imageUrl })
            .select();

        window.location = "/";
    }


    return (
        <div>
            <form>
                <label for="name">Title</label> <br />
                <input type="text" id="name" name="name" onChange={handleChange} /><br />
                <br/>

                <label for="genre">Genre</label><br />
                {/* <input type="text" id="genre" name="genre" onChange={handleChange} /><br /> */}
                <div className="radio-group">
                <label htmlFor="anime">
                    <input type="radio" id="anime" name="genre" value="Anime" onChange={handleChange} />
                    Anime
                </label>
                <label htmlFor="indie">
                    <input type="radio" id="indie" name="genre" value="Indie" onChange={handleChange} />
                    Indie Film
                </label>
                <label htmlFor="hollywood">
                    <input type="radio" id="hollywood" name="genre" value="Hollywood" onChange={handleChange} />
                    Hollywood
                </label>
                <label htmlFor="bollywood">
                    <input type="radio" id="bollywood" name="genre" value="Bollywood" onChange={handleChange} />
                    Bollywood
                </label>
                <label htmlFor="manga">
                    <input type="radio" id="manga" name="genre" value="Manga" onChange={handleChange} />
                    Manga
                </label>
                <label htmlFor="webtoon">
                    <input type="radio" id="webtoon" name="genre" value="Webtoon" onChange={handleChange} />
                    Webtoon
                </label>
                <label htmlFor="game">
                    <input type="radio" id="game" name="genre" value="Game" onChange={handleChange} />
                    Videogame
                </label>
                <label htmlFor="book">
                    <input type="radio" id="book" name="genre" value="Book" onChange={handleChange} />
                    Book
                </label>
                <label htmlFor="eastern">
                    <input type="radio" id="eastern" name="genre" value="Eastern Film" onChange={handleChange} />
                    Eastern Film
                </label>
                <label htmlFor="other">
                    <input type="radio" id="other" name="genre" value="Other" onChange={handleChange} />
                    Other
                </label>
                </div>
                <br />

                <label htmlFor="imageUrl">Image URL (optional)</label><br />
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} /><br />
                <br />

                <label for="personal_thoughts">Personal Thoughts</label><br />
                <textarea rows="5" cols="50" id="personal_thoughts" name='personal_thoughts' onChange={handleChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost