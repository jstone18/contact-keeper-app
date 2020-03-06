import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContex";
import ContactItem from "./ContactItem";

const Contacts = () => {
	const contactContex = useContext(ContactContext);

	const { contacts } = contactContex;
	return (
		<Fragment>
			{contacts.map(contact => (
				<ContactItem key={contact.id} contact={contact} />
			))}
		</Fragment>
	);
};

export default Contacts;
