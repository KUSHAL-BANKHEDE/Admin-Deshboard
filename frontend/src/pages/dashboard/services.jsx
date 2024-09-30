import { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", info: "", image: null });

  // Fetch services on load
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  // Handle input change for service creation
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewService({ ...newService, image: files[0] });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  // Submit new service
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newService.name);
    formData.append("info", newService.info);
    if (newService.image) formData.append("image", newService.image);

    try {
      await axios.post("/api/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchServices(); // Refresh services list
    } catch (error) {
      console.error("Error creating service", error);
    }
  };

  // Delete a service
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/services/${id}`);
      fetchServices(); // Refresh services list
    } catch (error) {
      console.error("Error deleting service", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

      {/* New Service Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Service Name</label>
          <input
            type="text"
            name="name"
            value={newService.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Service Info</label>
          <textarea
            name="info"
            value={newService.info}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Service Image</label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Service
        </button>
      </form>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {services.map((service) => (
          <div key={service._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{service.name}</h2>
            <p>{service.info}</p>
            {service.image && (
              <img src={service.image} alt={service.name} className="my-2 w-full" />
            )}
            <button
              className="bg-red-500 text-white p-2 rounded mt-2"
              onClick={() => handleDelete(service._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
