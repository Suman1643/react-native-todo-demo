import {
  Text,
  View,
  Keyboard,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import Task from "@/components/Task";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [task, setTask] = useState<string>("");
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask("");
  };

  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <View style={styles.items}>
            {taskItems.length === 0 && (
              <Text style={styles.noTasksText}>No tasks yet</Text>
            )}
            {taskItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task title={item} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder="Write a task"
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    color: "#000",
  },
  textWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  noTasksText: {
    fontSize: 16,
    color: "#c0c0c0",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 45,
    height: 45,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3dcbeb",
    borderWidth: 1,
  },
  addText: {
    fontSize: 20,
    color: "#3dcbeb",
  },
});
