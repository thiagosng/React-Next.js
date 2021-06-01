import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState([0]);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((posts) => {
        return posts.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postAndPhotos = await loadPosts();

    setPosts(postAndPhotos.slice(page, postsPerPage));
    setAllPosts(postAndPhotos);
  }, []);

  useEffect(() => {
    console.log(new Date().toLocaleString('pt-br'));
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não existem posts = </p>}

      <div className="button-container">
        {!searchValue && <Button text="Load More Posts" onClick={loadMorePosts} disabled={noMorePosts} />}
      </div>
    </section>
  );
};
