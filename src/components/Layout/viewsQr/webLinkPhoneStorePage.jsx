/*
 * @Author : Jaider cuartas, @Fecha 2024-07-15
 * @Descripción : Página que muestra los datos de una tienda en un layout específico para teléfonos. Utiliza el hook useParams para obtener el ID de la tienda desde la URL y el hook useAuth para obtener datos de la tienda. Muestra una interfaz de carga mientras se obtienen los datos y maneja errores de forma adecuada.
 * @Props : Nop
 * @Retorna : Retorna la página de la tienda con un layout específico para teléfonos, mostrando datos una vez cargados.
 */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { StoreLayout } from '../qrContent/LayoutsQr/stylePhoneStoreLayout';

const WebLinkPhoneStorePage = () => {
    const { id } = useParams();
    const [appFormValues, setAppFormValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getStoreData } = useAuth();

    const fetchData = async () => {
        setLoading(true);
        console.log("Fetching data for music ID:", id);
        try {
            const result = await getStoreData(id);
            setAppFormValues(result.data);
            console.log("Data fetched:", result.data);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // empty dependency array means this effect runs only once, on mount

    return (
        <div className='flex items-center justify-center min-h-screen'>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {appFormValues && <StoreLayout appFormValues={appFormValues}/>}
        </div>
    );
};

export default WebLinkPhoneStorePage;
