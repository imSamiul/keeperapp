import { useRef, useState } from "react";
import image from "../../assets/99440742-c256-45d5-83ed-3eba65361063.jpg";
import { useSubmit } from "react-router-dom";
import { updateAvatar } from "../../services/apiUsers";

function ProfileImage() {
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const submit = useSubmit();
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      console.log("Selected file:", file);

      formData.append("avatar", file);
      console.log(formData.get("avatar"));
      // const res = await updateAvatar(formData);

      // You can do something with the selected file here

      submit({ avatar: formData }, { method: "PATCH" });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div
      className="relative flex items-center justify-center "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Image that acts as a button */}
      <img
        src={image}
        alt="Click to upload"
        className="cursor-pointer rounded-lg border-2 border-blue-500 hover:border-blue-700 w-full h-full max-w-80 max-h-80 "
        onClick={handleImageClick}
      />

      {/* Edit Icon */}
      {isHovered && (
        <div className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full">
          <i className="fa-solid fa-pen-to-square"></i>
        </div>
      )}
    </div>
  );
}

export default ProfileImage;
