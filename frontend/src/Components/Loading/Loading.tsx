import { ReactComponent as Logo} from '../../assets/loading.svg';

const Loading = () => {
  return (
    <div id="loader-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20%" }}>
      <Logo/>
    </div>
  )
}
export default Loading;
