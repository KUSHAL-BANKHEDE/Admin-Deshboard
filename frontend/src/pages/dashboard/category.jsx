import { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", info: "", image: null });

  // Fetch Categories on load
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
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

  // Submit new Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("info", newCategory.info);
    if (newCategory.image) formData.append("image", newCategory.image);

    try {
      await axios.post("/api/category", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCategory(); // Refresh Categories list
    } catch (error) {
      console.error("Error creating category", error);
    }
  };

  // Delete a Category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/category/${id}`);
      fetchCategory(); // Refresh categories list
    } catch (error) {
      console.error("Error deleting category", error);
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
