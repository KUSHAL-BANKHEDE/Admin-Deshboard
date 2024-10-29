import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch booking data from the backend
  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5003/api/books/bookings');
      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleApproval = async (id) => {
    try {
      const response = await fetch(`http://localhost:5003/api/books/approve/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to approve venue');
      }

      await fetchBookings();
    } catch (error) {
      console.error('Error approving venue:', error);
    }
  };

  // Filter bookings based on search input
  const filteredBookings = bookings.filter((booking) => {
    const ownerName = booking.ownerName?.toLowerCase() || '';
    const country = booking.businessAddress?.country?.toLowerCase() || '';
    const email = booking.email?.toLowerCase() || '';

    return (
      ownerName.includes(search.toLowerCase()) ||
      country.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );
  });

  return (
    <div>
    <h1>Dashboard</h1>
    <input
      type="text"
      placeholder="Search by Owner Name, Country, or Email"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
    />
    <div className="dashboard-container">
     
      
      <table>
        <thead>
          <tr>
          <th>S.No</th>
              <th>Business Name</th>
              <th>Owner's Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Country</th>
              <th>Venue Name</th>
              <th>Type of Venue</th>
              <th>Capacity</th>
              <th>Size (sq. ft.)</th>
              <th>Availability</th>
              <th>Operating Hours</th>
              <th>Facilities Available</th>
              <th>Seating Arrangement Options</th>
              <th>Hourly Rate</th>
              <th>Daily Rate</th>
              <th>Discount for Long Bookings</th>
              <th>Discount Rate (%)</th>
              <th>Additional Charges</th>
              <th>Booking Policy</th>
              <th>Cancellation Policy</th>
              <th>Account Holder Name</th>
              <th>Bank Name</th>
              <th>Account Number</th>
              <th>IFSC Code</th>
              <th>Special Instructions</th>
              <th>Approval Status</th>
          </tr>
        </thead>
        <tbody>
  {filteredBookings.map((booking, index) => (
    <tr key={booking._id}>
      <td>{index + 1}</td>
      <td>{booking.businessName}</td>
      <td>{booking.ownerName}</td>
      <td>{booking.email}</td>
      <td>{booking.phone}</td>
      <td>{booking.businessAddress?.street}</td>
      <td>{booking.businessAddress?.city}</td>
      <td>{booking.businessAddress?.state}</td>
      <td>{booking.businessAddress?.zipCode}</td>
      <td>{booking.businessAddress?.country}</td>
      <td>{booking.venueName}</td>
      <td>{booking.venueType}</td>
      <td>{booking.capacity}</td>
      <td>{booking.sizeInSqFt}</td>
      <td>{booking.availability}</td>
      <td>{booking.operatingHours ? `${booking.operatingHours.from} - ${booking.operatingHours.to}` : ''}</td>
      <td>{booking.facilitiesAvailable?.join(', ')}</td>
      <td>{booking.seatingArrangementOptions?.join(', ')}</td>
      <td>{booking.pricing?.hourlyRate}</td>
      <td>{booking.pricing?.dailyRate}</td>
      <td>{booking.pricing?.discountForLongBookings ? 'Yes' : 'No'}</td>
      <td>{booking.pricing?.discountRate}</td>
      <td>{booking.additionalCharges?.join(', ')}</td>
      <td>{booking.bookingPolicy}</td>
      <td>{booking.cancellationPolicy}</td>
      <td>{booking.bankDetails?.accountHolderName}</td>
      <td>{booking.bankDetails?.bankName}</td>
      <td>{booking.bankDetails?.accountNumber}</td>
      <td>{booking.bankDetails?.ifscCode}</td>
      <td>{booking.additionalNotes}</td>
      <td>
        <button
          onClick={() => handleApproval(booking._id)}
          className={`p-2 rounded ${
            booking.isApproved 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors duration-200`}
          disabled={booking.isApproved}
        >
          {booking.isApproved ? 'Approved' : 'Approve Venue'}
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
    </div>
  );
};

export default Dashboard;
