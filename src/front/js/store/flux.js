const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{ title: "FIRST", background: "white", initial: "white" },
			{ title: "SECOND", background: "white", initial: "white" }],
			contacts: [],
			currentContact: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setCurrentContact: (contact) => setStore({ currentContact: { ...contact } }),
			getContacts: async () => {
				const host = "https://playground.4geeks.com/contact/agendas"
				const user = "AlvaroD"
				const uri = `${host}/${user}/contacts`
				const options = {
					method: 'GET'
				}

				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error', response.status, response.statusText
					);
					return
				}
				const data = await response.json()
				setStore({ contacts: data.contacts })
			},

			editContact: async () => {
				const store = getStore();
				const currentContact = store.currentContact;

				if (!currentContact || !currentContact.id) {
					console.log("Error: El contacto no tiene un ID válido");
					return;
				}

				const dataToSend = {
					name: currentContact.name,
					phone: currentContact.phone,
					email: currentContact.email,
					address: currentContact.address
				};

				const host = "https://playground.4geeks.com/contact/agendas";
				const user = "AlvaroD";
				const uri = `${host}/${user}/contacts/${currentContact.id}`;
				const options = {
					method: 'PUT',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(dataToSend)
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error", response.status, response.statusText);
					return;
				}

				await getActions().getContacts();

			},

			addContact: async (newContact) => {


				const dataToSend = {
					name: newContact.name,
					phone: newContact.phone,
					email: newContact.email,
					address: newContact.address
				};

				const host = "https://playground.4geeks.com/contact/agendas";
				const user = "AlvaroD";
				const uri = `${host}/${user}/contacts`;
				const options = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(dataToSend)
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error", response.status, response.statusText);
					return;
				}

				await getActions().getContacts();
			},
			deleteContact: async (id) => {
				const host = "https://playground.4geeks.com/contact/agendas";
				const user = "AlvaroD";
				const uri = `${host}/${user}/contacts/${id}`;
				const options = {
					method: 'DELETE',
					headers: {
						"Content-type": "application/json"
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}
				const store = getStore();
				setStore({
					contacts: store.contacts.filter(contact => contact.id !== id)
				});
			},


			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
