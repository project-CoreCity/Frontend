import { useState } from "react";
import { useSelector } from "react-redux";
import { addServerAddress } from "../../apis/user";
import PropTypes from "prop-types";

function ServerAddressForm({ onAddAddress }) {
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!address) return;

    const result = await addServerAddress(userId, token, address);

    if (result.error) {
      alert(result.error);

      return;
    }

    setAddress("");
    onAddAddress();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <input type="submit" value={"Add"} />
        </div>
      </form>
    </div>
  );
}

ServerAddressForm.propTypes = {
  onAddAddress: PropTypes.func.isRequired,
};

export default ServerAddressForm;
