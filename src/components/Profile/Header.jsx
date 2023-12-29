import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import useAuth from "../../customHooksAndServices/authContextHook";
import useEditProfile from "../../customHooksAndServices/editProfileHook";
import ProfilePicture from "./ProfilePicture";

const options = {
  day: "numeric",
  month: "short",
  year: "numeric",
};
const formatter = new Intl.DateTimeFormat("local", options);
function Header() {
  const { user, setUser } = useAuth();
  const { editProfileInfo } = useEditProfile();
  async function imgChangeHandler(formData) {
    formData.append("editProperty", "imageUrl");
    const response = await editProfileInfo({
      editProperty: "",
      editValue: formData,
      isFormData: true,
    });
    if (response.status === 200) {
      setUser((prev) => ({ ...prev, imageUrl: response.data.imageUrl }));
      alert("Profile updated successfully!");
      return "success";
    } else {
      // console.log(response.response.data);
      window.alert(response.response.data.message);
    }
  }

  function dateFormatter(date) {
    const formattedDate = formatter.format(new Date(date));
    if (formattedDate.includes(",")) return formattedDate;

    const split = formattedDate.split(" ");
    split[1] += ",";
    // formattedDate.split(' ')[]
    return split.join(" ");
  }

  return (
    <div css={styles}>
      <div className="background"></div>
      <div className="container">
        <div className="avatar">
          {/* <img src="https://i.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4--free-avatars-online-profile.jpg" /> */}
          <ProfilePicture
            imageURL={user.imageUrl}
            imgChangeHandler={imgChangeHandler}
          />
        </div>
        <div className="user--info">
          <Typography
            variant="h5"
            color="white"
            className="name"
            fontSize="2rem"
          >
            {user.firstName + " " + user.lastName}
          </Typography>
          <Typography
            color="#ccc"
            fontSize="14px"
            mt="3px"
          >{`ID: ${user.username}`}</Typography>
          <Typography variant="subtitle1" color="#ccc" fontStyle="14px">
            {`Member from: ${dateFormatter(user.joiningDate)}`}
          </Typography>
        </div>
      </div>
    </div>
  );
}

const styles = css`
  .background {
    background: rgba(35, 45, 57, 0.8);
    position: absolute;
    z-index: -1;
    height: 420px;
    width: 100%;
  }
  .container {
    padding-top: 150px;
    margin-left: 15px;
    display: flex;
    box-sizing: content-box;
    align-items: center;
  }
  .avatar {
    flex: 0 0 25%;
    text-align: center;
    img {
      cursor: pointer;
      height: 140px;
      width: 140px;
    }
  }
  @media (max-width: 1000px) {
    .container {
      flex-direction: column;
      //   align-items: center;
      height: fit-content;
      .avatar {
        flex: 0 0 100%;
        display: grid;
        place-items: center;
        img {
          width: 120px;
          height: 120px;
        }
      }

      .user--info {
        margin-bottom: 1.2rem;
        text-align: center;
      }
    }
  }
`;

export default Header;
