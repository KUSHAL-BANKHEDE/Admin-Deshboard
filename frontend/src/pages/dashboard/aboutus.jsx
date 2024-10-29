import { useState, useEffect } from "react";
import { Domain } from "@/utils/constent";

const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dfj7iplni/image/upload';
const cloudinaryPreset = 'admin-deshboard';

const AboutUs = () => {
  const [aboutUsList, setAboutUsList] = useState([]);
  const [newAbout, setNewAbout] = useState({
    aboutus: "", 
    marketPlace: "", 
    problem: "", 
    solution: "", 
    image: null
  });
  const [editingId, setEditingId] = useState(null); // Track editing state

  // Fetch About Us data on load
  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${Domain}/api/aboutus`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setAboutUsList(data);
      } else {
        console.error("Error fetching About Us data");
      }
    } catch (error) {
      console.error("Error fetching About Us data", error);
    }
  };

  // Handle input change for About Us creation/editing
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewAbout({ ...newAbout, image: files[0] });
    } else {
      setNewAbout({ ...newAbout, [name]: value });
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
        return data.secure_url;
      } else {
        console.error("Error uploading image");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image", error);
      return null;
    }
  };

  // Submit new or updated About Us entry
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the image to Cloudinary (if new image is selected)
    const uploadedImageUrl = newAbout.image instanceof File
      ? await uploadImageToCloudinary(newAbout.image)
      : newAbout.image; // Use existing image URL if in edit mode and no new image is selected

    if (uploadedImageUrl) {
      const aboutData = {
        aboutus: newAbout.aboutus,
        marketPlace: newAbout.marketPlace,
        problem: newAbout.problem,
        solution: newAbout.solution,
        image: uploadedImageUrl,
      };

      const token = sessionStorage.getItem("token");

      if (editingId) {
        // Update existing entry
        try {
          const response = await fetch(`${Domain}/api/aboutus/${editingId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(aboutData),
          });

          if (response.ok) {
            fetchAboutUs(); // Refresh the list
            setEditingId(null); // Clear editing state
            setNewAbout({ aboutus: "", marketPlace: "", problem: "", solution: "", image: null }); // Clear form
          } else {
            console.error("Error updating About Us entry");
          }
        } catch (error) {
          console.error("Error updating About Us entry", error);
        }
      } else {
        // Create new entry
        try {
          const response = await fetch(`${Domain}/api/aboutus`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(aboutData),
          });

          if (response.ok) {
            fetchAboutUs(); // Refresh the list
            setNewAbout({ aboutus: "", marketPlace: "", problem: "", solution: "", image: null }); // Clear form
          } else {
            console.error("Error creating About Us entry");
          }
        } catch (error) {
          console.error("Error creating About Us entry", error);
        }
      }
    }
  };

  // Delete an About Us entry
  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${Domain}/api/aboutus/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchAboutUs(); // Refresh the list
      } else {
        console.error("Error deleting About Us entry");
      }
    } catch (error) {
      console.error("Error deleting About Us entry", error);
    }
  };

  // Handle edit button click
  const handleEdit = (about) => {
    setEditingId(about._id); // Set the ID of the item being edited
    setNewAbout({
      aboutus: about.aboutus,
      marketPlace: about.marketPlace,
      problem: about.problem,
      solution: about.solution,
      image: about.image,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{editingId ? "Edit About Us" : "Create About Us"}</h1>

      {/* New About Us Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">About Us</label>
          <input
            type="text"
            name="aboutus"
            value={newAbout.aboutus}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Market Place</label>
          <input
            type="text"
            name="marketPlace"
            value={newAbout.marketPlace}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Problem</label>
          <textarea
            name="problem"
            value={newAbout.problem}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold">Solution</label>
          <textarea
            name="solution"
            value={newAbout.solution}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
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
          {editingId ? "Update About Us" : "Create About Us"}
        </button>
      </form>

      {/* About Us List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {aboutUsList.map((about) => (
          <div key={about._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{about.aboutus}</h2>
            <p><strong>Market Place:</strong> {about.marketPlace}</p>
            <p><strong>Problem:</strong> {about.problem}</p>
            <p><strong>Solution:</strong> {about.solution}</p>
            {about.image && (
              <img src={about.image} alt={about.aboutus} className="my-2 w-full" />
            )}
            <button
              className="bg-yellow-500 text-white p-2 rounded mt-2"
              onClick={() => handleEdit(about)}
            >
              Edit
            </button>
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
