import { useState, useEffect } from "react";
import { Domain } from "@/utils/constent";

// Cloudinary URL
const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dfj7iplni/image/upload';
const cloudinaryPreset = 'admin-deshboard';

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", info: "", image: null });
  const [imageUrl, setImageUrl] = useState(""); // Store the uploaded image URL

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch services
  const fetchServices = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${Domain}/api/services`, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        console.error("Error fetching catagory");
      }
    } catch (error) {
      console.error("Error fetching catagory", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewService({ ...newService, image: files[0] });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", cloudinaryPreset);

    try {
      const response = await fetch(cloudinaryUploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.secure_url; // Get the image URL
      } else {
        console.error("Error uploading image");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image", error);
      return null;
    }
  };

  // Submit new service
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the image to Cloudinary
    const uploadedImageUrl = await uploadImageToCloudinary(newService.image);

    if (uploadedImageUrl) {
      const serviceData = {
        name: newService.name,
        info: newService.info,
        image: uploadedImageUrl, // Use the Cloudinary image URL
      };

      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${Domain}/api/services`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(serviceData),
        });

        if (response.ok) {
          fetchServices(); // Refresh the service list
        } else {
          console.error("Error creating service");
        }
      } catch (error) {
        console.error("Error creating service", error);
      }
    }
  };

  // Delete a service
  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${Domain}/api/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchServices(); // Refresh the service list
      } else {
        console.error("Error deleting service");
      }
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