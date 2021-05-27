import React from 'react'; 
import './styles.css';

import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';


export class Home extends Component {

    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 2,
      searchValue: ''
    };
    
    async componentDidMount() {
      await this.loadPosts();
    }
    loadPosts = async() => {
      const { page, postsPerPage } = this.state;
      const postAndPhotos = await loadPosts();
      this.setState({
        posts: postAndPhotos.slice(page,postsPerPage),
        allPosts: postAndPhotos,
      });
}

loadMorePosts = () => {
  const {
    page,
    postsPerPage,
    allPosts,
    posts
  } = this.state;
  const nextPage = page + postsPerPage;
  const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
  posts.push(...nextPosts);
  
  this.setState({posts, page: nextPage})
}

handleChange = (e) => {
  const {value} = e.target;
  this.setState({searchValue: value});
}

  render(){
    const { 
      posts, 
      page, 
      postsPerPage, 
      allPosts, 
      searchValue 
    } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(posts => {
      return posts.title.toLowerCase().includes(
        searchValue.toLowerCase());
    }) :  
    posts;

    return (
      <section className="container">
        <div class="search-container">

     
        {!!searchValue && (
        
          <h1>Search value: {searchValue}</h1>
          
        )}

       
        <TextInput searchValue={searchValue} handleChange= {this.handleChange} />
        
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts = </p>
        )}
        
        
        
        
        <div className="button-container">
          {!searchValue && (
          <Button 
          text="Load More Posts"
          onClick={this.loadMorePosts}
          disabled={noMorePosts}
          />
          )}
        
        </div>
        
      </section>
  );
}
}

