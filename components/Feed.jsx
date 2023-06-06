'use client'
import {useState, useEffect} from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick, setSearch}) => {
  const [tag, setTag] = useState('')
  const [docs, setDocs] = useState([])
  const handleTag = (handleTagClick) => {
    setTag(handleTagClick)
    setSearch(tag)
  }
  useEffect(() => {
    setDocs(data.filter((d) => {
      return d.tag.includes(tag)
    }))
  }, [tag])

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTag}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()

      if(!searchText === '' || ' ' ) {
        setPosts(data)
      } 
      setPosts(data.filter((d) => {
        return d.tag.includes(searchText) || d.prompt.includes(searchText)
      }))
    }
  
    fetchPosts()

  }, [searchText])
  
  const setSearch = (value) => {
    setSearchText(value)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input className="search_input peer"
          placeholder='Search for a tag'
          value={searchText}
          onChange={handleSearchChange} 
        />
      </form>
      {posts.length 
      ?
      <PromptCardList 
      data={posts}
      setSearch={setSearch}
      onClick={() => {}}
      />
      :<h1>No prompt found</h1>
      }
    </section>
  )
}

export default Feed