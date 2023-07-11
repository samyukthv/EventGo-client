import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { organizerPosts } from '../../api/UserApi';
import { useState } from 'react';
const POST_IMAGE_URL="http://localhost:3000/public/organizerPost/"

function OrganizerPostsUserSide() {
    const[post,setPost]=useState(null)
    const params = useParams();
    const organizerId = params.id;
    console.log(organizerId,"thtiehtiehteitneitnententeintentneinenter");  
    useEffect(()=>{
        organizerPosts(organizerId).then(res=>{
            console.log(res.data,88);
            setPost(res.data.postDetails)
        }).catch(err=>{
            console.log(err);
        })
    },[])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 my-5 md:grid-cols-3 px-16 lg:grid-cols-4 gap-20 lg:px-10">
    {post && post.map((item, index) => (
      <div key={item._id} className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={item.image} alt="Post" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{item.title}</div>
          <p className="text-gray-700 text-base">{item.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
         
        </div>
      </div>
    ))}
  </div>
  )
}

export default OrganizerPostsUserSide
