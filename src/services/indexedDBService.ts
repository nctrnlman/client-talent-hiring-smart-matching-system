// src/services/indexedDBService.ts
import { openDB, DBSchema } from "idb";

interface UserData {
  id: number;
  email: string;
  name: string;
  companyName?: string | null;
}

interface UserSession {
  token: string;
  role: string;
  userData: UserData;
}

interface MyAppDB extends DBSchema {
  sessions: {
    key: string;
    value: UserSession;
  };
}

export const initDB = async () => {
  const db = await openDB<MyAppDB>("MyAppDB", 1, {
    upgrade(db) {
      db.createObjectStore("sessions", { keyPath: "token" });
    },
  });
  return db;
};

export const saveUserSession = async (session: UserSession) => {
  const db = await initDB();
  await db.put("sessions", session);
};

export const getUserSession = async (
  token: string
): Promise<UserSession | undefined> => {
  const db = await initDB();
  return await db.get("sessions", token);
};
