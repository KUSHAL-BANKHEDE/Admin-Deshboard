import { User_domain } from '@/utils/constent';
import React, { useEffect, useState } from 'react';

const userQueries = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(`${User_domain}/api/contact/allQueries`)
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  return (
    <div>
      <h1>Contact Submissions</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Enquiry Type</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.enquiryType}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default userQueries;
