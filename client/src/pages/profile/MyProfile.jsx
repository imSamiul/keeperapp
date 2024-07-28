import React, { useEffect } from "react";
import { useNavigation } from "react-router-dom";

function MyProfile({ setLoaded }) {
  const navigation = useNavigation();
  useEffect(() => {
    setLoaded(true);
  }, [navigation.state, setLoaded]);

  return (
    <div>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
      />
    </div>
  );
}

export default MyProfile;
