/*
 * @Author : Jaider cuartas,   @date 2024-07-15 20:13:14
 * @description : Componente para mostrar contenido dinámico de una aplicación basado en la ruta actual. 
 * Incluye formularios para configurar valores de aplicación, redes sociales y música, así como un modal para ver una vista previa en un dispositivo móvil.
 * @return : Retorna un componente React que muestra contenido dinámico y permite la configuración de formularios.
 */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PhoneContentSwitch, QrContentSwitch } from '../components/Layout/qrContent';
import NotFoundPage from './NotFoundPage';
import { useStepper } from '../context/StepperContext';
import ChangeFrame from '../components/Layout/qrContent/changeFrame';
import { contentTexts } from '../components/Layout/qrContent/contentData';
import Valuesjson from '../pages/user/Valuesjson.json';
import Modal from 'react-modal';
import CellBox from '../components/Layout/qrContent/cellBox';
import axios from 'axios';
import { OptionBarTwo } from '../components/Layout/optionBar';
import { useQr } from '../context/QrContext';

Modal.setAppElement('#root');

const initialAppFormValues = Valuesjson.appFormValues;
const initialSocialFormValues = Valuesjson.socialFormValues;
const initialMusicFormValues = Valuesjson.musicFormValues;

const AppContent = () => {
    const { contentName, id } = useParams(); // Asegúrate de que qrId está presente en la ruta
    const { setActiveStep } = useStepper();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleSocialFormSubmit = () => {
        setSelectedTab(1); // Cambia al tab "Preview QRytogenia"
    };

    const {
        appFormValues,
        setAppFormValues,
        musicFormValues,
        setMusicFormValues,
        socialFormValues,
        setSocialFormValues,
        currentContentType,
        setCurrentContentType,
        resetQrData
    } = useQr();
    const [valuesLoaded, setValuesLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    setCurrentContentType(contentName);
    console.log(selectedTab)

    useEffect(() => {
        const fetchQRData = async () => {
            if (location.pathname.includes('/edit')) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/qr/getpreview/${id}`, {
                        withCredentials: true,
                    });
                    const { title, colorTitle, description, descriptionColor, boxColor, borderImg, image, backgroundColor, selectedOptions } = response.data;
                    console.log(response.data)

                    // Actualiza los estados basados en los datos recibidos
                    setAppFormValues({
                        title,
                        colorTitle,
                        description,
                        descriptionColor,
                        boxColor,
                        borderImg,
                        image,
                        backgroundColor,
                        selectedOptions
                    });

                    setSocialFormValues(
                        {
                            title,
                            colorTitle,
                            description,
                            descriptionColor,
                            boxColor,
                            borderImg,
                            image,
                            backgroundColor,
                            selectedOptions
                        }
                    );
                    setMusicFormValues(
                        {
                            title,
                            colorTitle,
                            description,
                            descriptionColor,
                            boxColor,
                            borderImg,
                            image,
                            backgroundColor,
                            selectedOptions
                        }
                    );
                    console.log(musicFormValues)
                    setValuesLoaded(true); // Indicar que los valores se han cargado
                } catch (error) {
                    console.error('Error fetching QR data:', error);
                }
            } else {
                // Restablecer los valores de los formularios al cambiar de ruta
                setAppFormValues(initialAppFormValues);
                setSocialFormValues(initialSocialFormValues);
                setMusicFormValues(initialMusicFormValues);
                setValuesLoaded(true); // Indicar que los valores se han cargado
            }
            setActiveStep(1);
        };

        fetchQRData();
    }, [location, id, setActiveStep, setAppFormValues, setSocialFormValues, setMusicFormValues]);

    const content = contentTexts[contentName.toLowerCase().replace(/\s+/g, '-')];
    const name = contentName.replace(/-/g, ' ');

    if (!content) {
        return <NotFoundPage />;
    }

    useEffect(() => {
        const scrollToSection = () => {
            const section = document.getElementById('qr-content');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        };

        resetQrData()

        scrollToSection();
    }, [location]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleTabChange = (newTab) => {
        setSelectedTab(newTab);
    };

    const isQrRoute = location.pathname.startsWith('/qr/');
    console.log(name)
    return (
        <>
            {isQrRoute && <OptionBarTwo contentName={contentName} name={name} />}
            <section id='qr-content'>
                <div className='text-center'>
                    <h1>{name}</h1>
                    <p>{content}</p>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 w-11/12 m-auto py-10'>
                    <div className='col-span-1 lg:col-span-3 bg-white shadow-xl rounded-xl p-6'>
                        <QrContentSwitch
                            contentName={name}
                            onFormChangeApp={setAppFormValues}
                            onFormChange={setSocialFormValues}
                            onFormChangeMusic={setMusicFormValues}
                            onSocialFormSubmit={handleSocialFormSubmit}
                        />
                    </div>
                    <div className='col-span-1 lg:col-span-2'>
                        {valuesLoaded && (
                            <ChangeFrame
                                name={name}
                                appFormValues={appFormValues}
                                socialFormValues={socialFormValues}
                                musicFormValues={musicFormValues}
                                selectedTab={selectedTab}
                                onTabChange={handleTabChange}
                                location={location}
                                qrId={id}
                            />
                        )}
                    </div>
                </div>
            </section>

            <button onClick={openModal} className='block lg:hidden px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 fixed bottom-16 right-4 z-50'>
                Ver Vista Previa
            </button>

            <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    contentLabel="Vista Previa del Móvil"
    className="fixed inset-0 flex items-center justify-center p-4 bg-transparent"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-auto"
>
    <div className="bg-transparent p-0 rounded-lg border-none shadow-none flex justify-center items-center w-full h-full">
        <div className="relative flex justify-center items-start" style={{ maxHeight: 'calc(100vh - 40px)', maxWidth: 'calc(100vw - 40px)' }}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-red-500 z-10">Cerrar</button>
            <div className="relative" style={{ transform: 'scale(0.9)', transformOrigin: 'top center', marginTop: '40px' }}>
                <CellBox>
                    <PhoneContentSwitch
                        contentName={name}
                        appFormValues={appFormValues}
                        socialFormValues={socialFormValues}
                        musicFormValues={musicFormValues}
                    />
                </CellBox>
            </div>
        </div>
    </div>
</Modal>
        </>
    );
};

export default AppContent;
