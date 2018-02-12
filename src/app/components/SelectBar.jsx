import React from 'react';
import PropTypes from 'prop-types';

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

SelectBar.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  selected: PropTypes.string,
  items: PropTypes.array.isRequired,
  selectHandler: PropTypes.func.isRequired
}

SelectBar.defaultProps = {
  label: '',
  type: '',
  selected: ''
}
