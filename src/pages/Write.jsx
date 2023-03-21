import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

const Write = () => {

  const state = useLocation().state

  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }


  const handleClick = async e => {
    e.preventDefault()
    const imgUrl = await upload()

    try {
      state ? await axios.put(`/posts/${state.id}`, {
        title, description:value, cat, img:file ? imgUrl : ""
      }) : await axios.post(`/posts/`, {
        title, description:value, cat, img:file ? imgUrl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            type="file"
            name=""
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload post image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="category"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "sports"}
              name="category"
              value="sports"
              id="sports"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sports">Sports</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "politics"}
              name="category"
              value="politics"
              id="politics"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="politics">Politics</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "social"}
              name="category"
              value="social"
              id="social"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="social">Social</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "family"}
              name="category"
              value="family"
              id="family"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="family">Family</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
