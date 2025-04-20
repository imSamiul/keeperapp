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
    <div className="flex justify-center items-center md:h-screen text-white font-figtree ">
      <div className="bg-[#14213d]  p-5 md:rounded-md grid grid-cols-1 md:grid-cols-2 w-full  md:w-3/4 lg:w-2/4  gap-5">
        <ProfileImage />
        <ProfileForm />
      </div>
    </div>
  );
}

export default MyProfile;
