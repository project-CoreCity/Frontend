import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addServerAddress } from "@/apis/user";
import { inputEnterIcon } from "@/assets/svgIcons";

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
        <div className="flex my-7">
          <div className="flex items-center justify-end w-[252px] h-[48px] border-l-[1px] border-y-[1px] border-[#c5cbce] bg-[#f7f8f9] rounded-l-full">
            <input
              className="w-[238px] h-[18px] bg-[#f7f8f9] placeholder:text-[#293137]"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your Server Address"
            />
          </div>

          <div>
            <button
              className="w-[48px] h-[48px] border-r-[1px] border-y-[1px] border-[#c5cbce] bg-[#f7f8f9] rounded-r-full"
              type="submit"
            >
              {inputEnterIcon}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

ServerAddressForm.propTypes = {
  onAddAddress: PropTypes.func.isRequired,
};

export default ServerAddressForm;
