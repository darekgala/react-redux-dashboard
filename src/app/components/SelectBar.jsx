import React from 'react';

export const SelectBar = (props) => {

  return (
    <div className='field'>
      <label className='label'>{props.label}</label>
      <div className='control has-icons-left'>
        <div className='select'>
          <select 
            onChange={(event) => props.selectHandler(event.target.value, props.type)}
            value={props.selected}>
            {props.items.map((item) => <option value={item.value} key={item.value}>{item.name}</option>)}
          </select>
        </div>
      
        <div className='icon is-small is-left'>
          <i className='fa fa-money'></i>
        </div>
      </div>
    </div>
  );
}
