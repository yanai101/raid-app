import {  useState, useEffect } from "react";
import {  getProfileImage } from "../firebase/user";
import {  getHorseProfileImage } from "../firebase/horse";
import Avatar from '@material-ui/core/Avatar';

function ProfileIcon({id,isHorse =false, alt}) {
  const [imgSrc, setImageSrc] = useState(isHorse ? '/horse.png': "/profile-placeholder.png");


	useEffect(() => {
    isHorse ?
    getHorseProfileImage(id).then((url) => !!url && setImageSrc(url)) : 
    getProfileImage(id).then((url) => !!url && setImageSrc(url));
  }, [id, isHorse]);


	return (
		<Avatar alt={alt} src={imgSrc} />
  );
}

export default ProfileIcon
