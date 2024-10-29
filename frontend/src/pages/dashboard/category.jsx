import { useState, useEffect } from "react";
import { Domain } from "@/utils/constent";
import axios from "axios";

const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dfj7iplni/image/upload';
const cloudinaryPreset = 'admin-deshboard';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", info: "", image: null });
  const [isEditing, setIsEditing] = useState(false); // Track if we are in editing mode
  const [editCategoryId, setEditCategoryId] = useState(null); // Track which category is being edited

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${Domain}/api/category`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Error fetching categories");
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Handle input change for Category creation/editing
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

  // Handle form submission for creating or updating category
  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = newCategory.image;

    // Upload the image to Cloudinary if there's a new image
    if (newCategory.image && typeof newCategory.image !== "string") {
      uploadedImageUrl = await uploadImageToCloudinary(newCategory.image);
    }

    const categoryData = {
      name: newCategory.name,
      info: newCategory.info,
      image: uploadedImageUrl || newCategory.image,
    };

    try {
      const token = sessionStorage.getItem("token");
      let response;

      if (isEditing) {
        // Update existing category
        response = await fetch(`${Domain}/api/category/${editCategoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(categoryData),
        });
      } else {
        // Create a new category
        response = await fetch(`${Domain}/api/category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(categoryData),
        });
      }

      if (response.ok) {
        fetchCategory(); // Refresh the category list
        setNewCategory({ name: "", info: "", image: null });
        setIsEditing(false);
        setEditCategoryId(null);
      } else {
        console.error("Error submitting category");
      }
    } catch (error) {
      console.error("Error submitting category", error);
    }
  };

  // Populate form for editing a category
  const handleEdit = (category) => {
    setIsEditing(true);
    setEditCategoryId(category._id);
    setNewCategory({
      name: category.name,
      info: category.info,
      image: category.image,
    });
  };

  // Delete a category
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
        fetchCategory(); // Refresh the category list
      } else {
        console.error("Error deleting category");
      }
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? "Edit Category" : "Create Category"}</h1>

      {/* New/Edit Category Form */}
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
          />
          {newCategory.image && typeof newCategory.image === "string" && (
            <img src={newCategory.image} alt="Current" className="my-2 w-full" />
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isEditing ? "Update Category" : "Create Category"}
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
              className="bg-green-500 text-white p-2 rounded mt-2"
              onClick={() => handleEdit(category)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded mt-2 ml-2"
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
