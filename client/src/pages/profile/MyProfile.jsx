import { useEffect } from "react";
import { useNavigation } from "react-router-dom";

import ProfileImage from "./ProfileImage";
import ProfileForm from "./ProfileForm";

function MyProfile({ setLoaded }) {
  const navigation = useNavigation();

  useEffect(() => {
    setLoaded(true);
  }, [navigation.state, setLoaded]);

  return (
    <div className="flex justify-center items-center h-screen text-white font-figtree ">
      <div className="bg-[#14213d] p-5 rounded-md grid grid-cols-2  w-2/4">
        <ProfileImage />
        <ProfileForm />
      </div>
    </div>
  );
}

export default MyProfile;
