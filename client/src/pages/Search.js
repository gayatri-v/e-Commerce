import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
    const[values,setValues]=useSearch()
  return (
    <Layout title={"search results"}>
      <div className="container">
        <div className="text-center">
            <h1>search results</h1>
            <h6>{values?.results.length<1 ?'No products found':`found ${values?.results.length}`}</h6>
            <div className="d-flex flex-wrap mt-4">
        {values?.results.map((p) => (
            
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text">${p.price}</p>
                    <button className="btn btn-primary ms-1 mb-2">More Details</button>
                    <button className="btn btn-primary ms-1">Add to Cart</button>
                  </div>
                </div>
              
            ))}
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search
