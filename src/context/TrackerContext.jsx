import React, { createContext, useState, useContext, useEffect } from "react";

const TrackerContext = createContext();

// --- DADOS INICIAIS ---
const initialHardwares = [
  {
    id: 101,
    model: "SenseCAP T1000",
    serial: "SN-SENSE-001",
    key: "key_abc_123",
    battery: 100,
    lastSeen: "N/A",
  },
  {
    id: 102,
    model: "Macaron F08-AZ",
    serial: "SN-MAC-999",
    key: "key_xyz_987",
    battery: 45,
    lastSeen: "Há 10 min",
  },
];

const initialAssets = [
  {
    id: 1,
    name: "Caminhão Entrega 01",
    type: "caminhao",
    assignedUserId: "3",
    linkedHardwareId: 102,
  },
];

const initialTypes = [
  { id: "veiculo_leve", label: "Veículo Leve", iconKey: "Car" },
  { id: "caminhao", label: "Caminhão", iconKey: "Truck" },
  { id: "ferramenta_eletrica", label: "Ferramenta Elétrica", iconKey: "Drill" },
];

const initialRoles = [
  { id: "gestor", label: "Gestor de Frota" },
  { id: "tecnico", label: "Técnico de Campo" },
  { id: "motorista", label: "Motorista" },
];

const initialUsers = [
  {
    id: 1,
    name: "Administrador",
    role: "Gestor de Frota",
    email: "admin@equiptrace.com",
  },
];

export const TrackerProvider = ({ children }) => {
  const [hardwares, setHardwares] = useState(
    () => JSON.parse(localStorage.getItem("loshall_hw")) || initialHardwares
  );
  const [assets, setAssets] = useState(
    () => JSON.parse(localStorage.getItem("loshall_assets")) || initialAssets
  );
  const [assetTypes, setAssetTypes] = useState(
    () => JSON.parse(localStorage.getItem("loshall_types")) || initialTypes
  );
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("loshall_users")) || initialUsers
  );
  const [roles, setRoles] = useState(
    () => JSON.parse(localStorage.getItem("loshall_roles")) || initialRoles
  );

  useEffect(() => {
    localStorage.setItem("loshall_hw", JSON.stringify(hardwares));
  }, [hardwares]);
  useEffect(() => {
    localStorage.setItem("loshall_assets", JSON.stringify(assets));
  }, [assets]);
  useEffect(() => {
    localStorage.setItem("loshall_types", JSON.stringify(assetTypes));
  }, [assetTypes]);
  useEffect(() => {
    localStorage.setItem("loshall_users", JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem("loshall_roles", JSON.stringify(roles));
  }, [roles]);

  // --- ACTIONS HARDWARE ---
  const addHardware = (hw) =>
    setHardwares([
      ...hardwares,
      { ...hw, id: Date.now(), battery: 100, lastSeen: "Novo" },
    ]);
  const updateHardware = (id, data) =>
    setHardwares((prev) =>
      prev.map((h) => (h.id === Number(id) ? { ...h, ...data } : h))
    );
  const removeHardware = (id) => {
    setHardwares((prev) => prev.filter((h) => h.id !== id));
    setAssets((prev) =>
      prev.map((a) =>
        a.linkedHardwareId === id ? { ...a, linkedHardwareId: null } : a
      )
    );
  };

  // --- ACTIONS ASSETS ---
  const addAsset = (asset) =>
    setAssets([...assets, { ...asset, id: Date.now() }]);
  const updateAsset = (id, data) =>
    setAssets((prev) =>
      prev.map((a) => (a.id === Number(id) ? { ...a, ...data } : a))
    );
  const removeAsset = (id) =>
    setAssets((prev) => prev.filter((a) => a.id !== id));
  const getAssetById = (id) => assets.find((a) => a.id === Number(id));

  // --- ACTIONS USERS (NOVO UPDATE) ---
  const addUser = (u) => setUsers([...users, { ...u, id: Date.now() }]);
  const updateUser = (id, data) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === Number(id) ? { ...u, ...data } : u))
    );
  const removeUser = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  // --- ACTIONS ROLES (NOVO UPDATE) ---
  const addRole = (label) =>
    setRoles([
      ...roles,
      { id: label.toLowerCase().replace(/\s/g, "_") + "_" + Date.now(), label },
    ]);
  const updateRole = (id, label) =>
    setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, label } : r)));
  const removeRole = (id) => {
    if (roles.length <= 1) return alert("Mínimo 1 cargo necessário.");
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  // --- ACTIONS ASSET TYPES (NOVO UPDATE) ---
  const addAssetType = (label, iconKey) =>
    setAssetTypes([...assetTypes, { id: Date.now(), label, iconKey }]);
  const updateAssetType = (id, data) =>
    setAssetTypes((prev) =>
      prev.map((t) => (t.id === Number(id) ? { ...t, ...data } : t))
    );
  const removeAssetType = (id) =>
    setAssetTypes((prev) => prev.filter((t) => t.id !== id));

  return (
    <TrackerContext.Provider
      value={{
        hardwares,
        addHardware,
        updateHardware,
        removeHardware,
        assets,
        addAsset,
        updateAsset,
        removeAsset,
        getAssetById,
        assetTypes,
        addAssetType,
        updateAssetType,
        removeAssetType,
        users,
        addUser,
        updateUser,
        removeUser,
        roles,
        addRole,
        updateRole,
        removeRole,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export const useTrackerContext = () => useContext(TrackerContext);
