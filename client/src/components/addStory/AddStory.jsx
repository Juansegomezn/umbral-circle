import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./addStory.scss";

export const AddStory = ({ setOpen }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStory) => makeRequest.post("/stories", newStory),
    onSuccess: () => {
      queryClient.invalidateQueries(["stories"]);
      setOpen(false);
    },
    onError: (err) => {
      setError(err.response?.data || "An error occurred during upload.");
      setLoading(false);
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setError(null);
    setFile(selectedFile);

    const fileUrl = URL.createObjectURL(selectedFile);
    setPreview({
      url: fileUrl,
      type: selectedFile.type.startsWith("video") ? "video" : "image",
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select an image or a video first.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    mutation.mutate(formData);
  };

  return (
    <div className="addStoryModal">
      <div className="modalContainer">
        <div className="modalHeader">
          <h2>Create a New Story</h2>
          <button className="closeBtn" onClick={() => setOpen(false)} disabled={loading}>
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleUpload}>
          <div className="uploadZone">
            {!preview ? (
              <label htmlFor="storyFile" className="uploadLabel">
                <CloudUploadIcon className="uploadIcon" />
                <span>Choose an Image or Video</span>
                <small>Videos must be under 10 seconds (Max 15MB)</small>
                <input
                  type="file"
                  id="storyFile"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            ) : (
              <div className="previewContainer">
                {preview.type === "video" ? (
                  <video src={preview.url} controls muted playsInline />
                ) : (
                  <img src={preview.url} alt="Story Preview" />
                )}
                <button
                  type="button"
                  className="changeFileBtn"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  disabled={loading}
                >
                  Change File
                </button>
              </div>
            )}
          </div>

          {error && <span className="errorMsg">{error}</span>}

          <div className="modalActions">
            <button
              type="button"
              className="cancelBtn"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="submitBtn" disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : "Share Story"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};