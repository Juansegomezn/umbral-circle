import './rightBar.scss'

export const RightBar = () => {
  return (
    <div className='rightBar'>
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/33245150/pexels-photo-33245150.jpeg" alt="" />
              <span>Marian Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/13410010/pexels-photo-13410010.jpeg" alt="" />
              <span>Sarah Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/5711923/pexels-photo-5711923.jpeg" alt="" />
              <p>
                <span>Jane Doe</span> liked a comment
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/3756945/pexels-photo-3756945.jpeg" alt="" />
              <p>
                <span>Sophia Iris</span> liked a post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/5711923/pexels-photo-5711923.jpeg" alt="" />
              <p>
                <span>Jane Doe</span> liked a post
              </p>
            </div>
            <span>2 min ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/5711923/pexels-photo-5711923.jpeg" alt="" />
              <p>
                <span>Jane Doe</span> changed their photo
              </p>
            </div>
            <span>8 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/5711923/pexels-photo-5711923.jpeg" alt="" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg" alt="" />
              <div className="online" />
              <span>Malik Rashim</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg" alt="" />
              <div className="online" />
              <span>Warren Murdet</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/31479302/pexels-photo-31479302.jpeg" alt="" />
              <div className="online" />
              <span>Stephanie Mun</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/13580690/pexels-photo-13580690.jpeg" alt="" />
              <div className="online" />
              <span>Mike Logan</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/11224524/pexels-photo-11224524.jpeg" alt="" />
              <div className="online" />
              <span>Alexander Demirov</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/3756945/pexels-photo-3756945.jpeg" alt="" />
              <div className="online" />
              <span>Sophia Iris</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="https://images.pexels.com/photos/33067479/pexels-photo-33067479.jpeg" alt="" />
              <div className="online" />
              <span>Alicia Ruth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
