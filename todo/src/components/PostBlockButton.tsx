
import { View } from "react-native";
import PostButton from "./PostButton";

const PostBlockButton = () => {

    return (
        <View style={{
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: "#444444",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <PostButton />
        </View>
    );
};

export default PostBlockButton;