import axios from 'axios';

export const fetchRandomImage = async ()=>{
    const img = await axios.get('api/randomImage')
    return img;
};

