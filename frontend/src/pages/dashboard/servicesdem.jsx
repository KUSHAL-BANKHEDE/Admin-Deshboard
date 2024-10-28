import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import ReactQuill from "react-quill";

const AdminDashboardForm = () => {
  const [services, setServices] = useState([
    { mainTitle: "", subServices: [{ subTitle: "", body: "", images: [] }] }
  ]);

  // Handle Main Service Add
  const handleAddMainService = () => {
    setServices([...services, { mainTitle: "", subServices: [{ subTitle: "", body: "", images: [] }] }]);
  };

  // Handle SubService Add
  const handleAddSubService = (index) => {
    const updatedServices = [...services];
    updatedServices[index].subServices.push({ subTitle: "", body: "", images: [] });
    setServices(updatedServices);
  };

  // Handle SubService Remove
  const handleRemoveSubService = (mainIndex, subIndex) => {
    const updatedServices = [...services];
    updatedServices[mainIndex].subServices.splice(subIndex, 1);
    setServices(updatedServices);
  };

  // Handle Service Field Changes
  const handleChangeService = (mainIndex, field, value) => {
    const updatedServices = [...services];
    updatedServices[mainIndex][field] = value;
    setServices(updatedServices);
  };

  // Handle SubService Field Changes
  const handleChangeSubService = (mainIndex, subIndex, field, value) => {
    const updatedServices = [...services];
    updatedServices[mainIndex].subServices[subIndex][field] = value;
    setServices(updatedServices);
  };

  // Handle Image Upload
  const handleImageUpload = (mainIndex, subIndex, files) => {
    const updatedServices = [...services];
    updatedServices[mainIndex].subServices[subIndex].images = Array.from(files);
    setServices(updatedServices);
  };

  // Handle Delete Main Service
  const handleDeleteService = (mainIndex) => {
    const updatedServices = [...services];
    updatedServices.splice(mainIndex, 1);
    setServices(updatedServices);
  };

  return (
    <div className="container">
      <h2>Admin Dashboard Form</h2>
      {services.map((service, mainIndex) => (
        <Card key={mainIndex} className="mb-3">
          <Card.Body>
            <Form.Group>
              <Form.Label>Main Title</Form.Label>
              <Form.Control
                type="text"
                value={service.mainTitle}
                onChange={(e) =>
                  handleChangeService(mainIndex, "mainTitle", e.target.value)
                }
                placeholder="Enter Main Title"
              />
            </Form.Group>

            {service.subServices.map((subService, subIndex) => (
              <Card className="mb-2" key={subIndex}>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Sub Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={subService.subTitle}
                      onChange={(e) =>
                        handleChangeSubService(mainIndex, subIndex, "subTitle", e.target.value)
                      }
                      placeholder="Enter Sub Title"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Body</Form.Label>
                    <ReactQuill
                      theme="snow"
                      value={subService.body}
                      onChange={(value) =>
                        handleChangeSubService(mainIndex, subIndex, "body", value)
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleImageUpload(mainIndex, subIndex, e.target.files)
                      }
                    />
                  </Form.Group>

                  <Button
                    variant="danger"
                    onClick={() => handleRemoveSubService(mainIndex, subIndex)}
                    className="mt-2"
                  >
                    <AiFillDelete /> Delete Sub Service
                  </Button>
                </Card.Body>
              </Card>
            ))}

            <Button
              variant="secondary"
              onClick={() => handleAddSubService(mainIndex)}
              className="mt-2"
            >
              Add New Sub Service
            </Button>

            <Button
              variant="danger"
              onClick={() => handleDeleteService(mainIndex)}
              className="mt-2 ms-2"
            >
              <AiFillDelete /> Delete Main Service
            </Button>
          </Card.Body>
        </Card>
      ))}

      <Button variant="primary" onClick={handleAddMainService}>
        Add Main Service
      </Button>
    </div>
  );
};

export default AdminDashboardForm;
