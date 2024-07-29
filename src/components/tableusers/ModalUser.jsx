/*
 * @Author : Jaider cuartas,   @date 2024-07-15 20:13:14
 * @description : Modal para mostrar los detalles de un usuario seleccionado. Muestra información como nombre de usuario, correo electrónico, rol y estado.
 * @Props :
 *   - openDialog: Booleano que indica si el modal está abierto.
 *   - setOpenDialog: Función para establecer el estado de apertura del modal.
 *   - selectedUser: Objeto que contiene los detalles del usuario seleccionado para mostrar en el modal.
 * @return : Retorna un componente modal que muestra los detalles del usuario seleccionado.
 */

import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const UserModal = ({ openDialog, setOpenDialog, selectedUser }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 300, // Ancho mínimo del modal
        width: '27%', // Ancho inicial del modal
        bgcolor: '#353535',
        boxShadow: 24,
        p: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        color: '#D9D9D9',
        overflow: 'auto', // Agrega scroll si el contenido es muy largo
    };

    const userInfoStyle = {
        marginTop: 20, // Ajusta el margen superior según sea necesario
    };

    return (
        <Modal open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <div>
                    {selectedUser && (
                        <div className="flex justify-center w-full">
                            <div className="flex justify-center w-full">
                                <div className="text-gray-1000 rounded-lg bg-indigo-500 p-2" style={{ width: '100%' }}>
                                    <p className="text-center">USER DETAILS: {selectedUser.username}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {selectedUser && (
                    <div style={userInfoStyle}>
                        <div>
                            <p className="text-gray-1000 mb-1">Username: {selectedUser.username}</p>
                            <p className="text-gray-1000 mb-1">Email: {selectedUser.email}</p>
                            <p className="text-gray-1000 mb-1">Rol: {selectedUser.rol}</p>
                            <p className="text-gray-1000 mb-1">Status: {selectedUser.state ? 'Activo' : 'Inactivo'}</p>
                        </div>
                    </div>
                )}
                <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <Button variant="contained" color="error" onClick={() => setOpenDialog(false)}>CLOSE</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default UserModal;