import React from 'react'
import './Post.css'
import Avatar from'@material-ui/core/Avatar'

function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
            <div className='post__header'>
                <Avatar 
                className='post__avatar'
                alt='shiva-mlk'>H</Avatar>
                <h3>{username}</h3>
        </div>
            {/* header -> avatear*/}
            <img className="post__image"
             src={imageUrl}
             alt=""/>
            {/* image */}
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
            {/* usename caption */}
            
        </div>
    )
}

export default Post
