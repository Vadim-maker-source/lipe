import { ID, Query } from "appwrite";
import { account, appwriteConfig, databases } from "./config";
import type { Otziv, User } from "./types";

export const registerUser = async (user: User) => {
  try {
      if (!appwriteConfig.userCollectionId) {
          throw new Error("User collection ID is not defined. Check your .env file.");
      }

      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );
  
      if (!newAccount) throw Error;

      // Сохраняем пользователя в коллекцию
      await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          ID.unique(),
          user
      );

      console.log("Пользователь успешно зарегистрирован");
  } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
      throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    await account.createEmailPasswordSession(email, password);
    console.log("Пользователь успешно вошел");
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    console.log("Пользователь вышел");
  } catch (error) {
    console.error("Ошибка при выходе:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    return user;
  } catch (error) {
    console.error("Ошибка при получении текущего пользователя:", error);
    return null;
  }
};

export const addOtziv = async (otziv: Otziv) => {
  try {
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.otziviCollectionId,
      ID.unique(),
      {
        attractionId: otziv.attractionId,
        userId: otziv.userId,
        username: otziv.username,
        text: otziv.text,
        rating: otziv.rating,
        imageUrl: otziv.imageUrl,
        createdAt: new Date().toISOString(),
      }
    );
    return response;
  } catch (error) {
    console.error("Ошибка при добавлении отзыва:", error);
    throw error;
  }
};

export const getOtziviByAttractionId = async (attractionId: string) => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.otziviCollectionId,
        [
          Query.equal("attractionId", attractionId) // Используем Query.equal
        ]
      );
      return response.documents;
    } catch (error) {
      console.error("Ошибка при получении отзывов:", error);
      throw error;
    }
  };