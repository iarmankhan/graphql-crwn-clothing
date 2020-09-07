import React from 'react';
import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';
import {gql, useQuery} from "@apollo/client";

const Directory = () => {
  const GET_SECTIONS = gql`
    {
      sections @client
    }
  `;

  const {data} = useQuery(GET_SECTIONS);
  return (
      <div className='directory-menu'>
        {data.sections.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
  );
}

export default Directory;
