import React, { useContext, useEffect, useState } from 'react'
import { FaStar, FaRegStar  } from "react-icons/fa";
import { IoLocationOutline, IoSearch  } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import Navbar from '../../components/Navbar/Navbar'
import RatingPopup from '../../components/RatingPopup/RatingPopup';
import './Home.css'
import { AppContext } from '../../context/storeContext'
import axios from 'axios'

const Home = () => {
  const [stores, setStores] = useState([])
  const [filteredStores, setFilteredStores] = useState([])
  const [rateStore, setRateStore] = useState({
    id: '', name: ''
  })
  const [popUp, setPopUp] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const token = localStorage.getItem('token')
  const {url} = useContext(AppContext)
  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await axios.get(url+'/api/stores', 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        if(response.status === 200){
            setStores(response.data)
            setFilteredStores(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchStoreDetails()
  }, [])
  console.log(stores);

  const handleSearch = () => { 
    const result = stores.filter(store => {
    return store.name.toLowerCase().includes(searchQuery.toLowerCase()) || store.address.toLowerCase().includes(searchQuery.toLowerCase())
  })
  setFilteredStores(result)
}
  
  return (
    <div className='home-page'>
      {popUp && <RatingPopup storeDetails={rateStore} setPopUp={setPopUp}  />}
       
        <div className='home'>
        <Navbar />
        <div className='home-container'>
             <div className='banner-section'>
                    <h1>Discover Amazing Stores</h1>
                    <p>Find local businesses and share your experiences with the community.</p>
             </div>
             <div className='search-container'>
                  <h2><IoSearch size={20} /> Find Stores</h2>
                  <div className='search-section'>
                     <input type="search" onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search by store name or address...' />
                     <button onClick={handleSearch}><IoSearch size={20}/> Search</button>
                  </div> 
             </div>
             <div className='store-section'>
              <h2>Available Stores</h2>
             <div className='stores-container'>
                {filteredStores.map(store => (
                  <div key={store.id} className='store-card'>
                      <h3>{store.name}</h3>
                      <div className='rating-container'>
                         {store.average_rating} <FaStar/>
                      </div>
                      <div className='location-container'>
                        <IoLocationOutline size={20} />
                        {store.address}
                      </div>
                      <div className='contact-container'>
                         <MdOutlineMailOutline size={20} />
                         {store.email}
                      </div>
                      <button className='rate-btn' onClick={() => {setPopUp(true)
                       setRateStore({id: store.id, name: store.name }) }}>
                        <FaRegStar size={18} />
                        Rate Store
                      </button>
                  </div>
                ))}
             </div>
             </div>
        </div>
        </div>
    </div>
  )
}

export default Home