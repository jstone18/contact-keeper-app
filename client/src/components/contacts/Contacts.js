import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContex";
import ContactItem from "./ContactItem";

const Contacts = () => {
	const contactContex = useContext(ContactContext);

	const { contacts, filtered } = contactContex;

	if (contacts.length === 0) {
		return <h4>You currently have no contacts listed.</h4>;
	}

	return (
		<Fragment>
			{filtered !== null
				? filtered.map(contact => (
						<ContactItem key={contact.id} contact={contact} />
				  ))
				: contacts.map(contact => (
						<ContactItem key={contact.id} contact={contact} />
				  ))}
		</Fragment>
	);
};

export default Contacts;
