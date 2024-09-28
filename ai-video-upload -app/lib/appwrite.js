import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.nms.rafi-aora",
  projectId: "66e2fadd0009811ea8ea",
  databaseId: "66e2fe3f001ec83a4e90",
  userCollectionId: "66e2fe6f0009f950f5d9",
  videoCollectionId: "66e2fe9f0032924c4060",
  storageId: "66e30077000dfb84f478",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// ? For SignUp With Appwrite
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//? For LogIn With AppWrite
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error;
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//? fetching current user info from appwrite database
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    //? fetching the current user from appwrite database
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log("Error getting current user" + error);
  }
};

//? fetching all videos uploaded by users

export const getAllposts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      // ? to show the latest posts on app
      [Query.orderDesc("$createdAt")]
    );
    return posts.documents;
  } catch (error) {
    console.log("Error fetching video posts from appwrite database " + error);
    throw new Error(error);
  }
};

//? fetching only new latest posts from appwrite database
export const getLatestposts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(
      "Error fetching new latest video posts from appwrite database " + error
    );
    throw new Error(error);
  }
};

//? fetching search results from appwrite database

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(
      "Error fetching new latest video posts from appwrite database " + error
    );
    throw new Error(error);
  }
};

//? particular user posts fetching from appwrite database
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
      [Query.orderDesc("$createdAt")],
    ]);
    return posts.documents;
  } catch (error) {
    console.log(
      "Error fetching new latest video posts from appwrite database " + error
    );
    throw new Error(error);
  }
};

//? for user logging out from app
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log("Error signing out" + error);
    throw new Error(error);
  }
};

//? for uploading file to appwrite database extra function to support file preview
export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error(
        "Unsupported file type - cannot create preview from database"
      );
    }

    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(
      "Error on supporting function getFilePreview Url coming from database" +
        error
    );
    throw new Error(error);
  }
};

//? Function that help to upload files to the appwrite database
export const uploadFile = async (file, type) => {
  if (!file) return;

  // const { mimeType, ...rest } = file;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.log(
      "Error Video Uploading Function uploadFile to AppWrite database" + error
    );
    throw new Error(error);
  }
};

//? For uploading user video and their details to appwrite database
export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnailUrl: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    console.log("Error Uploading Video to AppWrite database" + error);
    throw new Error(error);
  }
};
