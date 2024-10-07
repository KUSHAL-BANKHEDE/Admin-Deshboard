import { useState, useEffect } from "react";
import { Domain } from "@/utils/constent";
import axios from "axios";


const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dfj7iplni/image/upload';
const cloudinaryPreset = 'admin-deshboard';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", info: "", image: null });
  const [imageUrl, setImageUrl] = useState(""); // Store the uploaded image URL
  
  // const token = sessionStorage.getItem("token");

  // Fetch Categories on load
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${Domain}/api/category`, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Error fetching services");
      }
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  // Handle input change for Category creation
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewCategory({ ...newCategory, image: files[0] });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
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


  // Submit new Category
  // Submit new service
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the image to Cloudinary
    const uploadedImageUrl = await uploadImageToCloudinary(newCategory.image);

    if (uploadedImageUrl) {
      const serviceData = {
        name: newCategory.name,
        info: newCategory.info,
        image: uploadedImageUrl, // Use the Cloudinary image URL
      };

      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${Domain}/api/category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(serviceData),
        });

        if (response.ok) {
          fetchCategory(); // Refresh the service list
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
      const response = await fetch(`${Domain}/api/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchCategory(); // Refresh the service list
      } else {
        console.error("Error deleting service");
      }
    } catch (error) {
      console.error("Error deleting service", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* New Category Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Category Name</label>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Category Info</label>
          <textarea
            name="info"
            value={newCategory.info}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Category Image</label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Category
        </button>
      </form>

      {/* Categories List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <div key={category._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{category.name}</h2>
            <p>{category.info}</p>
            {category.image && (
              <img src={category.image} alt={category.name} className="my-2 w-full" />
            )}
            <button
              className="bg-red-500 text-white p-2 rounded mt-2"
              onClick={() => handleDelete(category._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
