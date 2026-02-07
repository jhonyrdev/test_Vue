//Configuracion de los elementos del form para usuario
export const userFormConfig = [
  {
    key: "name",
    label: "Nombre",
    type: "text" as const,
    required: true,
    placeholder: "Ingrese su nombre",
  },
  {
    key: "username",
    label: "Nombre de usuario",
    type: "text" as const,
    required: true,
    placeholder: "Ingrese su nombre de usuario",
  },
  {
    key: "email",
    label: "Correo electrónico",
    type: "email" as const,
    required: true,
    placeholder: "Ingrese su correo electrónico",
  },
  {
    key: "phone",
    label: "Teléfono",
    type: "text" as const,
    required: true,
    placeholder: "Ingrese su teléfono",
  },
];

//Configuracion de las columnas de la tabla para usuario
export const userTableConfig = [
  { key: "name", label: "Nombre" },
  { key: "username", label: "Nombre de usuario" },
  { key: "email", label: "Correo electrónico" },
  { key: "phone", label: "Teléfono" },
];
