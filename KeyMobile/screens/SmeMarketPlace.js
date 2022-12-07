import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { SpinnerImage } from "../../components";

const SmeMarketPlace = () => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onStateChange = useCallback((state) => {
    console.log(state, "state")
    // if (state == "buffering") {
    //   setLoading();
    // }
    if (state === "ended") {
      setPlaying(false);
      //   Alert.alert("video has finished playing!");
    }
    // setLoading(false);
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <View>
    
      <YoutubePlayer
        height={300}
        // play={playing}
        play={true}
        videoId={"TbVJEJVgxKM"}
        onChangeState={onStateChange}
        onError={() => setError(true)}
        initialPlayerParams={{
            loop: true,
            
        }}
      />
      {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
    </View>
  );
};

export default SmeMarketPlace;
