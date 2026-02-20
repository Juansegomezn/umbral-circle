import { Post } from '../post/Post'
import './posts.scss'

export const Posts = () => {
  
  const posts = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic: "https://images.pexels.com/photos/4129015/pexels-photo-4129015.jpeg",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum.",
      img: "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "48 minutes ago",
      likes: 32,
      comments: 9
    },
    {
      id: 2,
      name: "Jane Doe",
      userId: 2,
      profilePic: "https://images.pexels.com/photos/5711923/pexels-photo-5711923.jpeg",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatum.",
      date: "1 hour ago",
      likes: 3,
      comments: 2
    },
  ]
  
  return (
    <div className='posts'>
      {posts.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  )
}
