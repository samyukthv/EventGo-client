import React,{useEffect, useState} from 'react'
import { getPosts, postDelete } from '../../../api/OrganizerApi'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast';

function OriginalPosts() {
  const[post,setPost]=useState(null)

const organizerData = useSelector((state) => state.organizer);
const organizerId=organizerData?.id


    useEffect(()=>{
      getPosts(organizerId).then(res=>{
      setPost(res.data.organizerPosts.post)
   
      }).catch(err=>{
        console.log(err);
      })
     
    },[post])


    const deletePost= async(postId,organizerId)=>{
      console.log(organizerData.id,"delete");
      postDelete(postId,organizerData.id).then(res=>{
        if(res.data.success){
          toast.success("event deleted successfully")
             setPost(null)
        }
      
      })
    }



return (
  <div className="grid grid-cols-1 sm:grid-cols-2 my-5 md:grid-cols-3 px-16 lg:grid-cols-4 gap-20 lg:px-10">
    {post && post.map((item, index) => (
      <div key={item._id} className="max-w-sm rounded overflow-hidden shadow-lg text-center">
        <img className="w-full" src={item.image} alt="Post" />
       
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{item.title}</div>
          <p className="text-gray-700 text-base">{item.description}</p>
        </div>
        <div className='mb-5 flex justify-center text-center '>
        <button
  type="button"
  onClick={()=>deletePost(item._id)}
  class="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
  Danger
</button>
        </div>
      </div>
    ))}
  </div>
);

}

export default OriginalPosts
