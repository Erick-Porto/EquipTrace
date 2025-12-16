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
  {
    id: 103,
    model: "Dragino LGT-92",
    serial: "SN-DRA-555",
    key: "key_lora_555",
    battery: 98,
    lastSeen: "Estoque",
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
  {
    id: 2,
    name: "Maleta de Ferramentas",
    type: "caixa_ferramenta",
    assignedUserId: "2",
    linkedHardwareId: 101,
  },
];

const initialTypes = [
  { id: "veiculo_leve", label: "Veículo Leve", iconKey: "Car" },
  { id: "caminhao", label: "Caminhão", iconKey: "Truck" },
  { id: "ferramenta_eletrica", label: "Ferramenta Elétrica", iconKey: "Drill" },
  { id: "caixa_ferramenta", label: "Caixa de Ferramentas", iconKey: "Box" },
  { id: "manutencao", label: "Item em Manutenção", iconKey: "Wrench" },
];

// NOVOS DADOS INICIAIS DE CARGOS
const initialRoles = [
  { id: "gestor", label: "Gestor de Frota" },
  { id: "tecnico", label: "Técnico de Campo" },
  { id: "motorista", label: "Motorista" },
  { id: "suporte", label: "Suporte TI" },
];

const initialUsers = [
  {
    id: 1,
    name: "Administrador",
    role: "Gestor de Frota",
    email: "admin@loshall.com",
  },
  {
    id: 2,
    name: "João Técnico",
    role: "Técnico de Campo",
    email: "joao@loshall.com",
  },
  {
    id: 3,
    name: "Maria Logística",
    role: "Motorista",
    email: "maria@loshall.com",
  },
];

export const TrackerProvider = ({ children }) => {
  // STATES
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

  // NOVO STATE: ROLES
  const [roles, setRoles] = useState(
    () => JSON.parse(localStorage.getItem("loshall_roles")) || initialRoles
  );

  // PERSISTÊNCIA
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
  const getHardwareById = (id) => hardwares.find((h) => h.id === Number(id));

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

  // --- ACTIONS UTILS (Types & Users) ---
  const addAssetType = (l, k) =>
    setAssetTypes([...assetTypes, { id: Date.now(), label: l, iconKey: k }]);
  const removeAssetType = (id) =>
    setAssetTypes((prev) => prev.filter((t) => t.id !== id));

  const addUser = (u) => setUsers([...users, { ...u, id: Date.now() }]);
  const removeUser = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  // NOVAS ACTIONS: ROLES
  const addRole = (label) => {
    const id = label.toLowerCase().replace(/\s/g, "_") + "_" + Date.now();
    setRoles([...roles, { id, label }]);
  };
  const removeRole = (id) => {
    if (roles.length <= 1)
      return alert("É necessário ter pelo menos um cargo.");
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <TrackerContext.Provider
      value={{
        hardwares,
        addHardware,
        updateHardware,
        removeHardware,
        getHardwareById,
        assets,
        addAsset,
        updateAsset,
        removeAsset,
        getAssetById,
        assetTypes,
        addAssetType,
        removeAssetType,
        users,
        addUser,
        removeUser,
        roles,
        addRole,
        removeRole, // Exportando
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export const useTrackerContext = () => useContext(TrackerContext);
