import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { colors } from "./Assets";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";

export const Header = ({ label }) => {
  return (
    <Text
      style={{
        fontSize: 22,
        fontWeight: "bold",
        color: colors.secondary,
        marginHorizontal: 10,
        marginBottom: 20,
      }}
    >
      {label}
    </Text>
  );
};
export const Add = (props) => {
  const { width, height } = Dimensions.get("window");

  return (
    <>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles.upload,
          {
            // marginTop: 0.55 * height,
            height: 60,
            width: 60,
            right: 5,
            bottom: 55,
          },
        ]}
      >
        <Entypo name="plus" size={40} color={colors.secondary} />
      </TouchableOpacity>
    </>
  );
};

export const TodoItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onClick(props.Todo)}
      style={styles.todo}
    >
      <AntDesign
        onPress={() => props.Change(props.Todo)}
        name="checkcircle"
        size={34}
        color={props.status ? colors.success : colors.grey}
      />
      <Text
        style={{
          color: "black",
          fontSize: 14,
          maxWidth: "60%",
          textDecorationLine: props.status ? "line-through" : null,
        }}
      >
        {props.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
      >
        <Entypo
          onPress={() => props.edit(props.Todo)}
          name="edit"
          size={30}
          color="black"
        />
        <MaterialIcons
          onPress={() => props.remove(props.Todo.key)}
          style={{ marginLeft: 10 }}
          name="delete"
          size={30}
          color={colors.error}
        />
      </View>
    </TouchableOpacity>
  );
};

export const MyInput = (props) => {
  return (
    <TextInput
      style={{
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        maxWidth: "85%",
        marginVertical: 10,
        padding: 10,
      }}
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor={colors.grey}
      onChangeText={props.handleChange}
    />
  );
};

export const MyButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={{ color: "white" }}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export const NoData = (props) => {
  return (
    <View style={styles.container}>
      <AntDesign name="warning" size={54} color="black" />
      <Text
        style={{
          color: "black",
          maxWidth: "90%",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        You don't have any added tasks press the add button to add a new one
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  upload: {
    backgroundColor: colors.primary,
    borderRadius: 60,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todo: {
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 3,
    height: 70,
    borderRadius: 15,
    backgroundColor: colors.secondary,
    width: "91%",
    marginTop: 10,
    padding: 10,
    marginBottom: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  container: {
    marginVertical: 15,
    padding: 8,
    alignItems: "center",
  },
});
