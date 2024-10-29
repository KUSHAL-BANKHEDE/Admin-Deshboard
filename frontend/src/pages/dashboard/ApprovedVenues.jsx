import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const ApprovedVenues = () => {
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchApprovedVenues();
  }, []);

  const fetchApprovedVenues = async () => {
    try {
      const response = await fetch('http://localhost:5003/api/books/approved');
      if (!response.ok) {
        throw new Error(`Failed to fetch venues: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setVenues(data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  // Filter venues based on search input
  const filteredVenues = venues.filter((venue) => {
    const ownerName = venue.ownerName?.toLowerCase() || '';
    const country = venue.businessAddress?.country?.toLowerCase() || '';
    const email = venue.email?.toLowerCase() || '';

    return (
      ownerName.includes(search.toLowerCase()) ||
      country.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Approved Venues</h1>
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
            </tr>
          </thead>
          <tbody>
            {filteredVenues.map((venue, index) => (
              <tr key={venue._id}>
                <td>{index + 1}</td>
                <td>{venue.businessName}</td>
                <td>{venue.ownerName}</td>
                <td>{venue.email}</td>
                <td>{venue.phone}</td>
                <td>{venue.businessAddress?.street}</td>
                <td>{venue.businessAddress?.city}</td>
                <td>{venue.businessAddress?.state}</td>
                <td>{venue.businessAddress?.zipCode}</td>
                <td>{venue.businessAddress?.country}</td>
                <td>{venue.venueName}</td>
                <td>{venue.venueType}</td>
                <td>{venue.capacity}</td>
                <td>{venue.sizeInSqFt}</td>
                <td>{venue.availability}</td>
                <td>{venue.operatingHours ? `${venue.operatingHours.from} - ${venue.operatingHours.to}` : ''}</td>
                <td>{venue.facilitiesAvailable?.join(', ')}</td>
                <td>{venue.seatingArrangementOptions?.join(', ')}</td>
                <td>{venue.pricing?.hourlyRate}</td>
                <td>{venue.pricing?.dailyRate}</td>
                <td>{venue.pricing?.discountForLongBookings ? 'Yes' : 'No'}</td>
                <td>{venue.pricing?.discountRate}</td>
                <td>{venue.additionalCharges?.join(', ')}</td>
                <td>{venue.bookingPolicy}</td>
                <td>{venue.cancellationPolicy}</td>
                <td>{venue.bankDetails?.accountHolderName}</td>
                <td>{venue.bankDetails?.bankName}</td>
                <td>{venue.bankDetails?.accountNumber}</td>
                <td>{venue.bankDetails?.ifscCode}</td>
                <td>{venue.additionalNotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedVenues; 