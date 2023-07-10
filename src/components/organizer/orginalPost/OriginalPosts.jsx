import React,{useEffect, useState} from 'react'
import { getPosts } from '../../../api/OrganizerApi'
import { useSelector } from 'react-redux'
const POST_IMAGE_URL="http://localhost:3000/public/organizerPost/"

function OriginalPosts() {
  const[post,setPost]=useState(null)

    const organizerData = useSelector((state) => state.organizer);
console.log(organizerData,7878);
const organizerId=organizerData.id


    useEffect(()=>{

console.log(organizerId,90);
      getPosts(organizerId).then(res=>{
      setPost(res.data.organizerPosts.post)
   
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
);

}

export default OriginalPosts
