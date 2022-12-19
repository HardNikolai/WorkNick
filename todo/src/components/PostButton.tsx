import { Image, TouchableOpacity} from "react-native";
import { observer } from "mobx-react-lite";
import ButtonView from "../mobx/ButtonView";


const PostButton = observer(() => {
    const isButton = ButtonView.isButton;

    return (
        <TouchableOpacity onPress={() => ButtonView.changeIsButton()}>
            {
                isButton ?
                <Image source={require("../../assets/On.png")}/>
                :
                <Image source={require("../../assets/Off.png")}/>
            }
        </TouchableOpacity>
    );
});

export default PostButton;