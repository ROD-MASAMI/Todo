import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { colors } from "./Assets";
import * as component from "./Components";
import useHomePage from "./homePageHook";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";

const Home = () => {
  const { width, height } = Dimensions.get("window");
  const HomepageHook = useHomePage();
  //   console.log(HomepageHook.title);
  return (
    <SafeAreaView>
      <View style={[styles.topView, { height: 0.5 * height }]}>
        <component.Header label={"TODO-APP"} />
      </View>
      <View style={[styles.bottomView, { top: 0.3 * height }]}>
        {HomepageHook.Todos?.length < 1 && <component.NoData />}
        {HomepageHook.Loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            style={{ marginTop: 20 }}
            keyExtractor={(item) => item.key}
            data={HomepageHook.Todos}
            renderItem={({ item, index }) => {
              return (
                <component.TodoItem
                  title={item.value.title}
                  status={item.value.completed}
                  Change={(e) => HomepageHook.ChangeStatus(e)}
                  remove={(e) => HomepageHook.onDelete(e)}
                  Todo={item}
                  edit={(e) => HomepageHook.OpenEdit(e)}
                  onClick={(e) => {
                    HomepageHook.setSelected(e);
                    HomepageHook.setInfomodal(true);
                  }}
                />
              );
            }}
          />
        )}

        <component.Add onPress={() => HomepageHook.setInputModal(true)} />
      </View>
      {/* Modals */}
      <Modal isVisible={HomepageHook.inputModal}>
        <View style={{ marginLeft: -20 }}>
          <View style={[styles.modalContent2, { maxHeight: (3 / 4) * height }]}>
            <View style={styles.Line}></View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                marginBottom: 5,
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{ color: "black", lineHeight: 20, fontWeight: "bold" }}
              >
                {"ADD TODO ITEM "}
              </Text>
              <Entypo
                onPress={() => {
                  HomepageHook.setInputModal(false);
                  HomepageHook.setTitle(null);
                  HomepageHook.setDescription(null);
                  HomepageHook.setKey(null);
                  HomepageHook.setComlete(null);
                  HomepageHook.setStart(null);
                  HomepageHook.setUpdated(null);
                  HomepageHook.setEditing(false);
                }}
                name="cross"
                size={24}
                color="black"
              />
            </View>
            <View style={{ padding: 10 }}>
              <component.MyInput
                value={HomepageHook.title}
                placeholder={"Enter title"}
                handleChange={(e) => {
                  HomepageHook.setTitle(e);
                }}
              />
              <component.MyInput
                value={HomepageHook.description}
                placeholder={"Enter description"}
                handleChange={(e) => {
                  HomepageHook.setDescription(e);
                }}
              />
              {HomepageHook.Uploading ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <component.MyButton
                  label={HomepageHook.editing ? "Edit  " : "Create"}
                  onPress={() =>
                    HomepageHook.editing
                      ? HomepageHook.OnEdit()
                      : HomepageHook.CreateItem()
                  }
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
      {/* info */}
      <Modal isVisible={HomepageHook.infoModal} avoidKeyboard={true}>
        <View style={{ marginTop: 0.2 * height, marginLeft: -20 }}>
          <View style={[styles.modalContent2, { maxHeight: 0.58 * height }]}>
            <View style={styles.Line}></View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                marginBottom: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "#264596", lineHeight: 20, marginLeft: "25%" }}
              >
                {"Task Information "}
              </Text>
              <Entypo
                onPress={() => {
                  HomepageHook.setInfomodal(false);
                  HomepageHook.setSelected(null);
                }}
                name="cross"
                size={24}
                color="black"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ color: "black", fontWeight: "bold" }}>Title</Text>
              <Text style={{ color: "#393E4A", maxWidth: "75%" }}>
                {HomepageHook.selected?.value?.title}
              </Text>
              <Text
                style={{ color: "black", fontWeight: "bold", marginTop: 5 }}
              >
                Description
              </Text>
              <Text
                style={{
                  color: "#393E4A",
                  maxWidth: "98%",
                  marginBottom: 5,
                }}
              >
                {HomepageHook.selected?.value.description}
              </Text>
              <Text
                style={{ color: "black", fontWeight: "bold", marginTop: 5 }}
              >
                Created
              </Text>
              <Text style={{ color: "#393E4A", maxWidth: "75%" }}>
                {new Date(
                  HomepageHook.selected?.value.created
                ).toLocaleDateString()}
              </Text>
              <Text
                style={{ color: "black", fontWeight: "bold", marginTop: 5 }}
              >
                Status
              </Text>
              <Text style={{ color: "#393E4A", maxWidth: "75%" }}>
                {HomepageHook.selected?.value.completed
                  ? "Completed"
                  : "Pending"}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {
    height: "40%",
    width: "100%",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.tertiary,
    width: "100%",
    height: "150%",
    position: "absolute",
    alignItems: "center",
    padding: 10,
  },
  Line: {
    borderWidth: 2,
    borderRadius: 10,
    width: 60,
    marginTop: 5,
    borderColor: colors.grey,
    marginLeft: "45%",
  },
  modalContent2: {
    margin: 10,
    flexDirection: "column",
    backgroundColor: colors.secondary,
    borderRadius: 20,
    width: "100%",
    padding: 5,
  },
});
export default Home;
