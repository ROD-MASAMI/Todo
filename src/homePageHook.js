import React, { useEffect, useState } from "react";
import api from "./api";
import base64 from "react-native-base64";
import { Alert } from "react-native";

export default function useHomePage() {
  const [inputModal, setInputModal] = useState(false);
  const [Todos, setTodos] = useState();
  const [infoModal, setInfomodal] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [Loading, setLoading] = useState(false);
  const [Uploading, setuploading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [editing, setEditing] = useState(false);
  const [complete, setComlete] = useState();
  const [start, setStart] = useState();
  const [updated, setUpdated] = useState();
  const [key, setKey] = useState();
  const [selected, setSelected] = useState();
  const username = "admin";
  const password = "district";
  const authHeader = "Basic " + base64.encode(`${username}:${password}`);
  const CreateItem = async () => {
    if (!title || !description) {
      alert("Fill in all fields");
    } else {
      setuploading(true);
      const rand = Math.floor(Math.random() * 100);
      let data = {
        title,
        description,
        completed: false,
        created: new Date(),
        lastUpdated: new Date(),
        id: rand,
      };

      try {
        const Response = await api.post(`/RodneyPaul/${rand}`, data, {
          headers: { Authorization: authHeader },
        });
        if (Response.status === 201) {
          setuploading(false);
          setInputModal(false);
          alert("item added successfully");
          setRefresh((refresh) => refresh + 1);
        } else {
          setuploading(false);
          alert("error occured, please try again");
          console.log(Response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    getItems();

    return () => {};
  }, [refresh]);

  const ChangeStatus = async (item) => {
    try {
      let data = {
        title: item.value.title,
        description: item.value.description,
        completed: !item.value.completed,
        created: item.value.created,
        id: item.key,
      };
      const Response = await api.put(`/RodneyPaul/${item.key}`, data, {
        headers: { Authorization: authHeader },
      });
      if (Response.status === 200) {
        setRefresh((refresh) => refresh + 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const OnEdit = async () => {
    let data = {
      title,
      description,
      completed: complete,
      created: start,
      lastUpdated: updated,
      id: key,
    };
    setuploading(true);
    try {
      const Response = await api.put(`/RodneyPaul/${key}`, data, {
        headers: { Authorization: authHeader },
      });
      if (Response.status === 200) {
        setuploading(false);
        setRefresh((refresh) => refresh + 1);
        setInputModal(false);
        alert("item edited successfully");
        setTitle(null);
        setDescription(null);
        setKey(null);
        setComlete(null);
        setStart(null);
        setUpdated(null);
        setEditing(false);
      } else {
        setuploading(false);
      }
    } catch (err) {
      setuploading(false);
      console.log(err);
    }
  };

  const OpenEdit = async (item) => {
    setTitle(item?.value?.title);
    setDescription(item?.value?.description);
    setKey(item?.key);
    setComlete(item.value.completed);
    setStart(item.value?.created);
    setUpdated(item?.value?.lastUpdated);
    setInputModal(true);
    setEditing(true);
  };

  const Delete = async (e) => {
    try {
      const Response = await api.delete(`/RodneyPaul/${e}`, {
        headers: { Authorization: authHeader },
      });
      if (Response.status === 200) {
        setRefresh((refresh) => refresh + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = (e) => {
    Alert.alert("Deleting Task", "Are you sure you want to delete this task", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Yes", onPress: () => Delete(e) },
    ]);
  };

  const getItems = async () => {
    setLoading(true);
    try {
      const Response = await api.get(`/RodneyPaul/?fields=.`, {
        headers: { Authorization: authHeader },
      });
      if (Response.status === 200) {
        setTodos(Response.data.entries);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return {
    infoModal,
    setInfomodal,
    inputModal,
    setInputModal,
    Todos,
    setTodos,
    title,
    setTitle,
    description,
    setDescription,
    CreateItem,
    Uploading,
    setuploading,
    Loading,
    setLoading,
    ChangeStatus,
    onDelete,
    OpenEdit,
    setEditing,
    editing,
    OnEdit,
    setKey,
    setComlete,
    setStart,
    setUpdated,
    setEditing,
    selected,
    setSelected,
  };
}
