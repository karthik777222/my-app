import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Add = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestseller: false,
  });
  const [images, setImages] = useState({});

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, Array.isArray(value) ? JSON.stringify(value) : value)
      );
      Object.entries(images).forEach(([key, file]) => data.append(key, file));

      const response = await axios.post(`${BACKEND_URL}/api/product/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("✅ Product Added Successfully");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          subCategory: "",
          sizes: [],
          bestseller: false,
        });
        setImages({});
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error adding product");
    }
  };

  // Inline styles
  const styles = {
    container: { maxWidth: "600px", margin: "auto", padding: "20px" },
    form: {
      background: "#fff",
      padding: "25px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    title: { textAlign: "center", marginBottom: "20px", color: "#333" },
    sectionLabel: { fontWeight: "bold", marginBottom: "8px", display: "block" },
    uploadBox: {
      border: "1px dashed #aaa",
      padding: "15px",
      borderRadius: "6px",
      background: "#fafafa",
      marginBottom: "15px",
    },
    input: {
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
    },
    textarea: {
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      minHeight: "80px",
    },
    sizes: { display: "flex", gap: "10px", flexWrap: "wrap" },
    sizeOption: { background: "#f0f0f0", padding: "6px 12px", borderRadius: "6px" },
    submitBtn: { textAlign: "right" },
    button: {
      background: "#007bff",
      color: "#fff",
      padding: "10px 18px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={onSubmitHandler}>
        <h2 style={styles.title}>➕ Add Product</h2>

        {/* Upload Images */}
        <div>
          <p style={styles.sectionLabel}>Upload Images</p>
          {["image1", "image2", "image3", "image4"].map((img) => (
            <div key={img} style={styles.uploadBox}>
              <input type="file" name={img} onChange={handleImageChange} />
            </div>
          ))}
        </div>

        {/* Product Info */}
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={styles.textarea}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Sub Category"
          value={formData.subCategory}
          onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
          style={styles.input}
        />

        {/* Sizes */}
        <div>
          <p style={styles.sectionLabel}>Available Sizes</p>
          <div style={styles.sizes}>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} style={styles.sizeOption}>
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={() => toggleSize(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.bestseller}
              onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
            />
            Add to Bestseller
          </label>
        </div>

        {/* Submit */}
        <div style={styles.submitBtn}>
          <button type="submit" style={styles.button}>
            ✅ Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
