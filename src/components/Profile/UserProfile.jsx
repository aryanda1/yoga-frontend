import { css } from "@emotion/react";
import UserPofileItem from "./UserPorfileItem";
import { Typography, TextField, Button, Card } from "@mui/material";
import useAuth from "../../customHooksAndServices/authContextHook";
import useEditProfile from "../../customHooksAndServices/editProfileHook";
function UserProfile() {
  const { user, setUser } = useAuth();
  const { editProfileInfo } = useEditProfile();
  const batches = [
    "06:00AM-07:00AM",
    "07:00AM-08AM",
    "08:00AM-09:00AM",
    "05:00PM-06:00PM",
  ];
  const handleUpdate = async (name, value) => {
    const response = await editProfileInfo({
      editProperty: name,
      editValue: value,
    });
    if (response.status === 200) {
      setUser((prev) => ({ ...prev, [name]: value }));
      alert("Profile Updated Successfully");
    } else {
      window.alert(response.response.data.message);
    }
  };
  console.log(handleUpdate);

  return (
    <div css={styles}>
      <Card>
        <section className="section">
          <Typography
            sx={{
              fontWeight: "600",
              color: "rgba(0,0,0,0.65)",
              ml: "12px",
              mb: "8px",
            }}
          >
            Basic Info
          </Typography>
          <UserPofileItem
            title="First Name"
            desc={user.firstName}
            name="firstName"
            updateHandler={handleUpdate}
          />
          <UserPofileItem
            title="Last Name"
            desc={user.lastName}
            name="lastName"
            updateHandler={handleUpdate}
          />
          <UserPofileItem title="Age" desc={user.age} hideBtn />
          <UserPofileItem title="Batch" desc={batches[user.batch]} hideBtn />
          <UserPofileItem
            title="Next Batch"
            name="nextBatch"
            updateHandler={handleUpdate}
            desc={
              user.nextBatch ? batches[user.nextBatch] : batches[user.batch]
            }
          />
        </section>
        <section className="section">
          <Typography
            sx={{
              fontWeight: "600",
              color: "rgba(0,0,0,0.65)",
              ml: "12px",
              mb: "8px",
            }}
          >
            Account Info
          </Typography>
          <UserPofileItem
            title="Email"
            desc={user.email}
            name="email"
            updateHandler={handleUpdate}
          />
          <UserPofileItem
            title="Password"
            desc="*********"
            name="password"
            updateHandler={handleUpdate}
          />
        </section>
      </Card>
    </div>
  );
}

const styles = css`
  width: 75%;
  max-width: 800px;
  margin-inline: auto;
  background: white;
  margin-block: 20px 40px;
  border-radius: 7px;
  .section {
    padding: 20px 20px 0 20px;
    &:last-child {
      padding-bottom: 20px;
    }
  }
`;

export default UserProfile;
