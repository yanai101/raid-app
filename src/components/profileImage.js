import { Button } from "@material-ui/core";
import { useRef, useState, useEffect } from "react";
import { uploadUserImg, getProfileImage } from "../firebase/user";
import { uploadHorseImg, getHorseProfileImage } from "../firebase/horse";

import LinearProgress from "@material-ui/core/LinearProgress";

function ProfileImage({ id , isHorse = false}) {
  const inputRef = useRef();
  const [imgSrc, setImageSrc] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    isHorse ?
    getHorseProfileImage(id).then((url) => !!url && setImageSrc(url)) : 
    getProfileImage(id).then((url) => !!url && setImageSrc(url));
  }, [id]);

  const fileChange = async (files) => {
    isHorse ? 
    await uploadHorseImg(id, files[0], updateProgress, uploadDone).catch((e) => console.error(e)) :  
    await uploadUserImg(id, files[0], updateProgress, uploadDone).catch((e) => console.error(e));
  };

  const updateProgress = (snapshot) => {
    const progressN = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(progressN);
  };

  const uploadDone = (url) => {
    setImageSrc(url);
    setProgress(0);
  };

  const placeholder = isHorse ? '/horse.png': "/profile-placeholder.png"

  return (
    <div>
      <img src={imgSrc ||placeholder} alt="profile" style={{ width: "100%", height: "auto" }} />
      <input type="file" name="" id="" accept=".png,.jpg" ref={inputRef} onChange={(e) => fileChange(e.target.files)} style={{ display: "none" }} />
      {progress > 0 && <LinearProgress variant="determinate" value={progress} />}
      <Button variant="contained" onClick={() => inputRef.current.click()}>
        upload photo
      </Button>
    </div>
  );
}

export default ProfileImage;
