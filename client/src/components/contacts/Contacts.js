import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
			<TransitionGroup>
				{filtered !== null
					? filtered.map(contact => (
							<CSSTransition key={contact.id} timeout={500} classNames="item">
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))
					: contacts.map(contact => (
							<CSSTransition key={contact.id} timeout={500} classNames="item">
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</Fragment>
	);
};

export default Contacts;
