import { css } from "@emotion/react";
import CropperModal from "./CropperModal";
import { useState } from "react";
function ProfilePicture({
  imgChangeHandler,
  imageURL = "https://i.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4--free-avatars-online-profile.jpg",
}) {
  // const {user}
  //source of image used in avator editor
  const [src, setSrc] = useState(null);
  const [fileProps, setFileProps] = useState({ fileName: "", fileType: "" });
  // preview of image displayed
  const [preview, setPreview] = useState(imageURL);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  const handleImgChange = (e) => {
    console.log(e.target.files[0]);
    setFileProps({
      fileName: e.target.files[0].name,
      fileType: e.target.files[0].type,
    });
    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  return (
    <>
      <CropperModal
        modalOpen={modalOpen}
        src={src}
        submitHandler={imgChangeHandler}
        setModalOpen={setModalOpen}
        setPreview={setPreview}
        fileProps={fileProps}
      />
      <label htmlFor="photo-upload" css={styles} className="custom-file-upload">
        <div className="img-wrap img-upload">
          <img src={preview} />
        </div>
        <input
          id="photo-upload"
          type="file"
          onChange={handleImgChange}
          value=""
          accept="image/*"
        />
      </label>
    </>
  );
}

const styles = css`
  border-radius: 10px;
  display: inline-block;
  position: relative;
  padding: 6px;
  cursor: pointer;
  background: white;
  margin-bottom: 25px;
  input[type="file"] {
    display: none;
  }

  .img-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    display: grid;
  }
  .img-upload:before {
    content: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="48.08" viewBox="0 0 1664 1600"><path fill="rgba(0,0,0,0.65)" d="M1280 1408q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45m256 0q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45m128-224v320q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68m-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19H704q-26 0-45-19t-19-45V576H384q-42 0-59-40q-17-39 14-69L787 19q18-19 45-19t45 19l448 448q31 30 14 69"/></svg>');
    font-size: 90px;
    position: absolute;
    padding-top: 80px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #63d3a6;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    opacity: 0;
    transition: 0.5s ease;
    background-color: #fff;
  }
  .img-upload:hover:before {
    opacity: 1;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* label {
    text-transform: uppercase;
    font-weight: 700;
    color: #676767;
  }

  input {
    border-radius: 15px;
    border: 1px solid #b7b7b7;
    padding: 5px 5px 5px 10px;
    font-size: 18px;
    transition: 0.2s;
  } */
`;

export default ProfilePicture;
