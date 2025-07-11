import React, { useState } from 'react'
import './RatingPopup.css'

const RatingPopup = ({storeDetails, setPopUp}) => { 
    const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  return (
    // <div className='Rating-container'>
     <div className="modal-overlay">
      <div className="modal">
        <h3>Rate {storeDetails.name}</h3>
        <p className="subtext">Share your experience with other customers</p>

        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`star ${starValue <= (hover || rating) ? 'filled' : ''}`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            );
          })}
        </div>

        <textarea
          placeholder="Tell others about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="buttons">
          <button onClick={() => setPopUp(false)} >Cancel</button>
          <button  disabled={!rating}>Submit Rating</button>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default RatingPopup