
import { fetchRandomImage } from '../../../Service/imgService';
import { MenuItem } from 'react-pro-sidebar';

const rndImageStyle = {
    display: 'none', // CURRENTLY HIDDEN
    background: 'conic-gradient(from 45deg,red,yellow,lime,aqua,blue,magenta,red)',
    fontSize: '1.4rem',
    fontWeight: 'bolder',
    marginTop: '2rem',
};
function RandomImageButton({ handleLoadImage }: { handleLoadImage: (data: string[][]) => void }) {
    // const [currentImg, setCurrentImg] = useState<string[][]>([[]])          

    const getRandomImg = () => {
        fetchRandomImage().then(img => {
            // setCurrentImg(img.data);
            handleLoadImage(img.data);

        });
    }
    return (
        <MenuItem onClick={getRandomImg} style={rndImageStyle}>
            RandomImage
        </MenuItem>
    )
}

export default RandomImageButton