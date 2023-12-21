import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import useAuth from "../../customHooksAndServices/authContextHook";

function Header() {
  const { user } = useAuth();
  return (
    <div css={styles}>
      <div className="background"></div>
      <div className="container">
        <div className="avatar">
          <img src="https://i.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4--free-avatars-online-profile.jpg" />
        </div>
        <Typography variant="h5" color="white" className="name">
          {user.firstName + " " + user.lastName}
        </Typography>
      </div>
    </div>
  );
}

const styles = css`
  .background {
    // background-color: black;
    background: rgba(35, 45, 57, 0.8);
    position: absolute;
    z-index: -1;
    height: 387px;
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
      border: 5px solid white;
      border-radius: 15px;
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
      .name {
        margin-top: 1.2rem;
      }
    }
  }
`;

export default Header;
