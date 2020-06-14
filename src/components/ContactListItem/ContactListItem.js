import React from "react";
import PropTypes from "prop-types";
import { item, btn } from "./ContactListItem.module.css";

function ContactListItem({ name, number, onDeleteContact }) {
  return (
    <div className={item}>
      <p>
        {name}:{number}
      </p>
      <button className={btn} type="button" onClick={onDeleteContact}>
        Delete
      </button>
    </div>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
