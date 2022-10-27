import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { END_POINT } from '~/config';

const SideBarBlog = () => {
  const [recentBlogs, setRecentBlogs] = useState(null);

  useEffect(() => {
    const getRecentBlogs = async () => {
      const { data } = await axios.get(`${END_POINT}/api/v1/blogs?page=1&limit=3`, { withCredentials: true });
      setRecentBlogs(data.blogs);
    };
    getRecentBlogs();
  }, []);

  return (
    <div className="sidebar left-sidebar">
      <div className="s-side-text">
        <div className="sidebar-title clearfix">
          <h4 className="floatleft">Bài viết gần đây</h4>
        </div>
        <div className="recent-post clearfix">
          <ul>
            {recentBlogs &&
              recentBlogs.map((item, index) => (
                <li key={index}>
                  <Link to={`/blog/${item.slug}`}>
                    <img src={item.avatar ? item.avatar.url : ''} alt="" />
                  </Link>
                  <h5>
                    <Link to={`/blog/${item.slug}`} href="#">
                      {item.title}
                    </Link>
                  </h5>
                  <span>{new Date(Date.parse(item.createdAt)).toLocaleDateString('vi-VN')}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="s-side-text">
        <div className="banner clearfix">
          <Link>
            <img src="/img/products/banner.jpg" alt="" />
          </Link>
          <div className="banner-text">
            <h2>best</h2> <br />
            <h2 className="banner-brand">brand</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarBlog;
