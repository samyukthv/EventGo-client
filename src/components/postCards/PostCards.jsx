import React, { useEffect, useState } from 'react'
import { getPosts } from '../../api/UserApi'
import { Link } from 'react-router-dom'
import avatar from "../../assets/images/avathar2.png";


function PostCards() {
const[posts,setPosts]=useState(null)

useEffect(()=>{
 getPosts().then(res=>{
      setPosts(res.data.posts)
    
 })
},[])



return (
    <div className="mx-5 my-5">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-2 ">
    {posts?.map((details) => (
      <div
        key={details._id}
        className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide  transform hover:scale-106 transition duration-500"
      >
        <div className="md:flex-shrink-0">
          <img
            src={details.post.image}
            alt="mountains"
            className="w-full h-64 rounded-lg rounded-b-none"
          />
        </div>
        <div className="px-4 py-2 mt-2">
          <h2 className="font-bold text-2xl text-gray-800 tracking-normal uppercase ml-1">
            {details.post.title}.
          </h2>
          <p className="text-sm text-gray-700 px-2 mr-1">
            {details.post.description}
          </p>

          <div className="author flex items-center -ml-3 my-3">
            <div className="user-logo">
              <img
                className="w-12 h-12 object-cover rounded-full mx-4 shadow"
                src={
                    details?.organizer?.image?.slice(0, 33) ===
                    "https://lh3.googleusercontent.com"
                      ? details.organizer.image
                      : details.organizer.image
                      ? `${details.organizer.image}`
                      : avatar
                  }
                alt="avatar"
              />
            </div>
            <h2 className="text-sm tracking-tighter text-gray-900">
             <Link to={`/organizer-profile/${details.organizer._id}`}> <a>By {details.organizer.firstName}</a></Link>
            </h2>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default PostCards
