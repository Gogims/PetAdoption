import React from 'react';
import { Link } from 'react-router-dom';

const players = [
  {
    number: 1,
    name: 'Jose'
  },
  {
    number: 2,
    name: 'Brodie'
  }
]

const FullRoster = () => (
    <div>
      <ul>
        {
          players.map(p => (
            <li key={p.number}>
              <Link to={`/roster/${p.number}`}>{p.name}</Link>
            </li>
          ))
        }
      </ul>
    </div>
)

export default FullRoster;