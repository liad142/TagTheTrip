import React from 'react';

const Form = (props) => {
    const {handleSubmit, setTitle ,setDesc ,setRating} = props
    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input placeholder={'Enter a title'}
                   onChange={(e) => setTitle(e.target.value)}/>
            <label>Review</label>
            <textarea placeholder={'Write a quick review '}
                      onChange={(e) => setDesc(e.target.value)}/>
            <label>Rating</label>
            <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button className={'submitButton'} type={'submit'}>Add Pin</button>
        </form>
    );
};

export default Form;
