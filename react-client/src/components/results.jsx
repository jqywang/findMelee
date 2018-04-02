import React from 'react';

const Results = props => (
  <div>
    {props.listings.map(listing => {
      return (<div>{listing}</div>)
    })}
  </div>
)
export default Results;