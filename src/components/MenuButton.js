import React from 'react';
import PropTypes from 'prop-types';

const MenuButton = ({ className, disabled, label, icon, clickHandler }) => (
    <button
        disabled={disabled === null ? false : disabled}
        className={className === null ? '' : className}
        onClick={clickHandler}>
        {icon}
        {label && <span className='label'>{label}</span>}
    </button>
);
MenuButton.defaultProps = {
    className: null,
    disabled: false,
    label: null,
    icon: null
}
MenuButton.propTypes = {
    className: PropTypes.string,
    clickHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    icon: PropTypes.node,
};

export default MenuButton;