// Importaciones necesarias de hooks, componentes y funciones externas
import { useState, useMemo } from "react";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import { useApiGet } from "../../api/config/customHooks";
import { getEmployees } from "../../api/urls/Employee";
import DataTable from "react-data-table-component";
import { IconButton } from "../../components/Button/Button";
import RolesAdministrationStore from "../../../stores/RolesAdministrationStore";
import GeneralModal from "../../components/modal/GeneralModal";
import SelectRoleEmployee from "../../pages/RolesAdministration/SelectRoleEmployee";
import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { getRolesByEmployeeId } from "../../api/urls/userRole";
import TextButton from "../../components/Button/TextButton";
export default function RoleEmployee() {
  const setUserSelected = RolesAdministrationStore(
    (state) => state.setEmployeeSelected
  );
  const setUserRoles = RolesAdministrationStore((state) => state.setUserRoles);

  // Estado para el modal general
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: <SelectRoleEmployee />,
  });

  // Estado local para mostrar el loading
  const [loading, setLoading] = useState(false);
  // Función para obtener roles del empleado y abrir el modal
  const getUserRoles = (employeeId) => {
    setLoading(true);
    getRolesByEmployeeId(employeeId)
      .then((res) => {
        setLoading(true); // ← Este `setLoading(true)` parece innecesario aquí
        setUserRoles(res);
        setModalState({
          isOpen: true,
          content: (
            <SelectRoleEmployee
              setEmployeeModal={(val) =>
                setModalState({ isOpen: val, content: null })
              }
            />
          ),
        });
        setLoading(false);
      })
      .catch((e) => {
        setUserRoles([]);
        setLoading(false);
      });
  };
  //Fetch de empleados
  var {
    data: employees,
    isSuccess,
    isPending,
  } = useApiGet(["getEmployeess"], getEmployees, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  //Definición de columnas para la tabla de empleados
  const employeeColumns = [
    {
      name: "ID empleado",
      selector: (employee) => employee.id,
    },
    {
      name: "Nombre",
      selector: (employee) => employee.nombre,
    },

    {
      name: "Asignar/designar rol",
      center: true,
      cell: (employee) => (
        <IconButton
          bgColor={`bg-blue-500`}
          hoverBgColor={`hover:bg-blue-500`}
          hoverTextColor={`hover:text-black`}
          otherProperties="w-auto my-1"
          icon={faPersonCirclePlus}
          onClick={(e) => {
            setUserSelected(employee);
            getUserRoles(employee.id);
          }}
        />
      ),
    },
  ];
  //search
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = employees?.filter(
    (item) =>
      (item.nombre &&
        item.nombre.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.id && item.id.toLowerCase().includes(filterText.toLowerCase()))
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  return (
    <div className="rounded-lg p-6 w-[100%]">
      {/* Modal general que muestra el contenido dinámico (SelectRoleEmployee) */}
      <GeneralModal
        openModal={modalState.isOpen}
        setOpenModal={(val) => setModalState({ isOpen: val, content: null })}
        childrenComponent={modalState.content}
      />

      {/* Modal de carga mientras se obtienen los datos */}
      <LoadingModal openModal={loading} />

      <h2 className="text-xl font-bold mb-4">Usuarios</h2>

      <div className="overflow-x-auto">
        {/* Filtro de búsqueda */}
        <div className="flex">
          <input
            className="shadow border rounded-sm w-[300px] text-grey-darker text-lg focus:coutline-input py-2 px-3 mr-1"
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <TextButton text={"Limpiar"} onClick={handleClear} />
        </div>

        {/* Tabla de empleados */}
        <DataTable
          columns={employeeColumns}
          data={filteredItems}
          pagination
          responsive
          paginationResetDefaultPage={resetPaginationToggle}
          persistTableHead
          progressPending={isPending}
          progressComponent={<p>Cargando...</p>}
          subHeaderWrap
          striped
        />
      </div>
    </div>
  );
}
