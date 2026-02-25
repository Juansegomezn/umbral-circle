import { Post } from '../post/Post'
import './posts.scss'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'

export const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'], 
    queryFn: () =>
      makeRequest.get("/posts").then((res) => {
        return res.data;
      })
  })
  
  return (
    <div className='posts'>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error loading posts: {error.message}</p>
      ) : data && data.length > 0 ? (
        data.map((post) => (
          <Post post={post} key={post.id}/>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  )
}
