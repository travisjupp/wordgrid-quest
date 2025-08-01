import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@hooks/useAppHooks";
import Timer from "@features/timer/Timer";
import TopicFrame from "@components/TopicFrame"


const definitionsArray = [
  "Object representing the eventual completion or failure of an asynchronous operation and its resulting value XXX XXX XXX XXXXXX XXXX XXXX XX X",
  "AKA Stack Frame is the smallest unit of execution tracks bindings like variables and `this` context XXXXXXXX XXX XXXXX XXX XX XX",
  "Data structure that stores variables and function names and their values. Function; Declarative; Object; Global XXXXXXXXXXX XXXXX XXXX XXXX XXX XX XXXX X"
];

const category = 'Asynchronous JS';

const MajorHUD = () => {
  const dispatch = useAppDispatch();
  return (
    <View>
      <Timer />
      <TopicFrame 
        category={category}
        definitions={definitionsArray}
        topicframeWidth={200}
        topicframeHeight={200}
      />
    </View>
  )
}

export default MajorHUD;

