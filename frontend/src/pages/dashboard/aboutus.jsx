import { useState, useEffect } from "react";
import ReactQuill from "react-quill";

import { Domain } from "@/utils/constent"; // Update with your actual path

import "react-quill/dist/quill.snow.css"; // Quill editor's theme

const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dfj7iplni/image/upload';
const cloudinaryPreset = 'admin-deshboard';

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [newAboutUs, setNewAboutUs] = useState({ title: "", body: "", image: null });

  // Fetch existing About Us data on load
  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
    try {
      const response = await fetch(`${Domain}/api/aboutus`);
      if (!response.ok) {
        throw new Error("Failed to fetch About Us data");
      }
      const data = await response.json();
      setAboutUsData(data);
    } catch (error) {
      console.error("Error fetching About Us data", error);
    }
  };

  // Handle input change for title and image
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewAboutUs({ ...newAboutUs, image: files[0] });
    } else {
      setNewAboutUs({ ...newAboutUs, [name]: value });
    }
  };

  // Handle rich text editor change for body
  const handleBodyChange = (value) => {
    setNewAboutUs({ ...newAboutUs, body: value });
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

  // Submit new About Us data
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Current About Us Data:", newAboutUs);

    // Validate that all fields are filled
    if (!newAboutUs.title || !newAboutUs.body) {
      console.error("Title and body are required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newAboutUs.title);
    formData.append("body", newAboutUs.body);
    
    // Upload the image to Cloudinary if there's an image
    if (newAboutUs.image) {
      const uploadedImageUrl = await uploadImageToCloudinary(newAboutUs.image);
      formData.append("image", uploadedImageUrl); // Append the uploaded image URL
    }

    const token = sessionStorage.getItem("token"); // Get the token from session storage

    try {
      const response = await fetch(`${Domain}/api/aboutus`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Include token in the header if needed
          // Do not set Content-Type when sending FormData; it will be set automatically
        },
        body: formData, // Pass the form data
      });

      if (response.ok) {
        await fetchAboutUs(); // Refresh the data after submission
        setNewAboutUs({ title: "", body: "", image: null }); // Reset form
      } else {
        const errorData = await response.json();
        console.error("Error creating About Us content", errorData);
      }
    } catch (error) {
      console.error("Error creating About Us content", error);
    }
  };

  // Delete the existing About Us data
  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${Domain}/api/aboutus/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // Include token in the header if needed
        },
      });

      if (response.ok) {
        fetchAboutUs(); // Refresh the data after deletion
      } else {
        const errorData = await response.json();
        console.error("Error deleting About Us content", errorData);
      }
    } catch (error) {
      console.error("Error deleting About Us content", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage About Us</h1>

      {/* New About Us Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={newAboutUs.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Body</label>
          <ReactQuill
            value={newAboutUs.body}
            onChange={handleBodyChange}
            className="mb-4"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create About Us
        </button>
      </form>

      {/* Existing About Us Data */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {aboutUsData.map((about) => (
          <div key={about._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{about.title}</h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: about.body }}
            />
            {about.image && (
              <img src={about.image} alt={about.title} className="my-2 w-full" />
            )}
            <button
              className="bg-red-500 text-white p-2 rounded mt-2"
              onClick={() => handleDelete(about._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
