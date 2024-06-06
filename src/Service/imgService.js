import axios from 'axios';

export const getRandomImage = async ()=>{
    const img = await axios.get('api/randomImage')
    return img;
};

