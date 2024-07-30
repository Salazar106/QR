import { useState } from 'react';
import Button from '@mui/material/Button';
import Frame from './frame';
import Logo from './logo';
import QR, { saveQrData } from '../qrCode';
import '../../../../../src/assets/style/index.css'
import '../../styles/qrCode.css'
import { useQr } from '../../../../context/QrContext';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

const Design = ({ onTabSelect }) => {
    const [tabValue, setTabValue] = useState(0);
    const [subTabValues, setSubTabValues] = useState({
        0: 0, 1: 0, 2: 0, 3: 0,
    });
    const { qrProps, setQrColor, setMarcoType, setDotsType, setCornersSquareType, setCornersDotType, setDotsColor, setCornersSquareColor, setCornersDotColor } = useQr();
    const [colorPickerStates, setColorPickerStates] = useState({
        isDotsColorPickerOpen: false,
        isCornersSquareColorPickerOpen: false,
        isCornersDotColorPickerOpen: false,
    });
    const [currentColorPicker, setCurrentColorPicker] = useState(null);

    const colorPickerRefs = {
        dots: useRef(null),
        cornersSquare: useRef(null),
        cornersDot: useRef(null),
    };

    const handleToggleColorPicker = (type) => {
        setColorPickerStates(prevState => ({
            ...prevState,
            [type]: !prevState[type],
        }));
        setCurrentColorPicker(type);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSubTabChange = (tabIndex, subTabIndex) => {
        setSubTabValues(prevState => ({
            ...prevState,
            [tabIndex]: subTabIndex,
        }));
    };

    const handleClickOutside = (event) => {
        Object.keys(colorPickerRefs).forEach(type => {
            if (colorPickerRefs[type].current && !colorPickerRefs[type].current.contains(event.target)) {
                setColorPickerStates(prevState => ({
                    ...prevState,
                    [`is${type.charAt(0).toUpperCase() + type.slice(1)}ColorPickerOpen`]: false,
                }));
            }
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleColorChange = (color, type) => {
        console.log(`Color changed for ${type}:`, color);
        setQrColor(color);
        if (type === 'dots') {
            setDotsColor(color);
        } else if (type === 'cornersSquare') {
            setCornersSquareColor(color);
        } else if (type === 'cornersDot') {
            setCornersDotColor(color);
        }
    };

    const handleStyleMarco = (type) => {
        setMarcoType(type);
    };


    const handleStyleChange = (type) => {
        setDotsType(type);
    };

    const handleStyleChangecorner = (type) => {
        setCornersSquareType(type);
    };

    const handleStyleChangecornerdot = (type) => {
        setCornersDotType(type);
    };

    const tabTextColor = "#FF001F";

    return (
        <>
            <div className="tabs-container">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"

                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#FF001F",
                            height: '4px'
                        }
                    }}
                    sx={{
                        '& .MuiTabs-scrollButtons': {
                            width: '20px',
                            color: '#284B63',
                        },
                        '& .Mui-selected': {
                            color: '#FF001F', // cplor del texto seleccionado
                        },
                        '& .MuiTab-root': {
                            color: '#808080', // color text
                            '&.Mui-selected': {
                                color: '#FF001F', ///coolor cuadro
                            }
                        },
                    }}

                >
                    <Tab icon={<SlFrame />} label="Qr frame" sx={{
                        fontSize: '14px', fontWeight: 'bold',
                    }} />
                    <Tab icon={<MdOutlineQrCode2 />} label="Dots" sx={{
                        fontSize: '14px', fontWeight: 'bold',
                    }} />
                    <Tab icon={<MdOutlineQrCode />} label="Corners Square" sx={{
                        fontSize: '14px', fontWeight: 'bold',
                    }} />
                    <Tab icon={<IoQrCodeOutline />} label="Corners Dot" sx={{
                        fontSize: '14px', fontWeight: 'bold',
                    }} />
                </Tabs>
            </div>
            {tabValue === 0 && (
                <div>
                    <ScrollableMarcogQrs
                        onStyleClick={handleStyleMarco}
                        value={subTabValues[0]}
                        onChange={(event, newValue) => handleSubTabChange(0, newValue)}
                    />
                </div>
            )}
            {tabValue === 1 && (
                <div >
                    <ScrollableDesingQrs
                        onStyleClick={handleStyleChange}
                        value={subTabValues[1]}
                        onChange={(event, newValue) => handleSubTabChange(1, newValue)}
                    />
                    <div className="flex items-center mb-5 ml-7">

                        <div className="flex items-center border border-gray-300 rounded p-2 ml-3 mt-5 mb-1">
                            <div
                                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                style={{ background: colorPickerStates.isDotsColorPickerOpen && currentColorPicker === 'dots' ? qrProps.dotsColor : qrProps.dotsColor || '#D14B08' }}
                                onClick={() => handleToggleColorPicker('isDotsColorPickerOpen')}
                            ></div>
                            <input
                                type="text"
                                value={qrProps.dotsColor}
                                readOnly
                                className="ml-4 border-none outline-none"
                            />
                        </div>
                        {colorPickerStates.isDotsColorPickerOpen && (
                            <div className="absolute z-50 flex flex-col items-center p-3 bg-white border border-gray-300 rounded shadow-md" ref={colorPickerRefs.dots}>
                                <GradientColorPicker
                                    enableAlpha={true}
                                    disableHueSlider={false}
                                    presetColors={[]}
                                    onChange={(color) => handleColorChange(color, 'dots')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {tabValue === 2 && (
                <div className='ml-4'>
                    <Scrollcornersqueare
                        onStyleClick={handleStyleChangecorner}
                        value={subTabValues[2]}
                        onChange={(event, newValue) => handleSubTabChange(2, newValue)}
                    />
                    <div className="flex items-center mb-5 ml-1">

                        <div className="flex items-center border border-gray-300 rounded p-2 ml-3 mt-5 mb-5">
                            <div
                                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                style={{ background: colorPickerStates.isCornersSquareColorPickerOpen && currentColorPicker === 'cornersSquare' ? qrProps.cornersSquareColor : qrProps.cornersSquareColor || '#fff' }}
                                onClick={() => handleToggleColorPicker('isCornersSquareColorPickerOpen')}
                            ></div>
                            <input
                                type="text"
                                value={qrProps.cornersSquareColor}
                                readOnly
                                className="ml-4 border-none outline-none"
                            />
                        </div>
                        {colorPickerStates.isCornersSquareColorPickerOpen && (
                            <div className="absolute z-50 flex flex-col items-center p-3 bg-white border border-gray-300 rounded shadow-md" ref={colorPickerRefs.cornersSquare}>
                                <GradientColorPicker
                                    enableAlpha={true}
                                    disableHueSlider={false}
                                    presetColors={[]}
                                    onChange={(color) => handleColorChange(color, 'cornersSquare')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {tabValue === 3 && (
                <div className='ml-4'>
                    <Scrollcornerdot
                        onStyleClick={handleStyleChangecornerdot}
                        value={subTabValues[3]}
                        onChange={(event, newValue) => handleSubTabChange(3, newValue)}
                    />
                    <div className="flex items-center mb-5 ml-1">

                        <div className="flex items-center border border-gray-300 rounded p-2 ml-3 mt-5 mb-5">
                            <div
                                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                style={{ background: colorPickerStates.isCornersDotColorPickerOpen && currentColorPicker === 'cornersDot' ? qrProps.cornersDotColor : qrProps.cornersDotColor || '#fff' }}
                                onClick={() => handleToggleColorPicker('isCornersDotColorPickerOpen')}
                            ></div>
                            <input
                                type="text"
                                value={qrProps.cornersDotColor}
                                readOnly
                                className="ml-4 border-none outline-none"
                            />
                        </div>
                        {colorPickerStates.isCornersDotColorPickerOpen && (
                            <div className="absolute z-50 flex flex-col items-center p-3 bg-white border border-gray-300 rounded shadow-md" ref={colorPickerRefs.cornersDot}>
                                <GradientColorPicker
                                    enableAlpha={true}
                                    disableHueSlider={false}
                                    presetColors={[]}
                                    onChange={(color) => handleColorChange(color, 'cornersDot')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};


const options = [
    { name: 'Frame', component: Frame },
    { name: 'Design', component: Design },
    { name: 'Logo', component: Logo },
];

const CustomQr = ({location, qrId}) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const { qrType, qrData, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, socialFormValues, musicFormValues, qrBase64, currentContentType} = useQr();
    console.log(musicFormValues)
    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
    };

    const Dowload = async () => {
        const { value: qrName, isConfirmed } = await Swal.fire({
            title: 'Save QR Code',
            html: `
                <input id="swal-input1" className="swal2-input" placeholder="Enter QR code name...">
                <div style="margin: 2em 0;">
                    <p style="font-size: 1em; color: #888; margin-top: 10px;">Please enter a name for your QR code. If you do not set a name, the system will provide one for you.</p>
                    <p style="font-size: 0.8em; margin: 10px 0 0 0;">Click "Save" to finalize the creation of your QR code.</p>
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const input = document.getElementById('swal-input1').value;
                if (input.length > 30) {
                    Swal.showValidationMessage('The QR code name must be less than 30 characters');
                    return false;
                }
                return input;
            },
            showCancelButton: true,
            confirmButtonColor:'#007bff',
            confirmButtonText: 'Save',
            cancelButtonColor:"#d33",
            cancelButtonText: 'Cancel',
            customClass: {
                actions: 'swal2-actions-no-margin'
            }
        });

        if (isConfirmed) {
            console.log("Data: ", qrData + " Type: ", qrType)
            if ((qrType === 'website-url' || qrType === 'pdf') && qrData === "") {
                await Swal.fire({
                    icon: 'error',
                    title: 'Incomplete QR Information',
                    text: 'Please provide the URL or corresponding information for the QR code.',
                    confirmButtonText: 'OK'
                });
            } else {
                console.log(musicFormValues)
                console.log(qrType)
                await saveQrData(qrName, qrData, qrType, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, socialFormValues, musicFormValues,  qrBase64, currentContentType, location, qrId);
            }
        } else {
            toast.info('QR code saving was cancelled.');
        }
    }

    const style = document.createElement('style');
    style.innerHTML = `
        .swal2-actions-no-margin {
            margin-top: 0 !important;
        }
    `;
    document.head.appendChild(style);


    const OptionComponent = options[selectedOptionIndex].component;

    return (
        <div className='w-full rounded-md flex flex-col justify-between pb-4 font-sans'>
            <div className={`flex relative mb-4 py-8 max-h-[400px] ${qrTextProps.qrText ? 'min-h-[380px]' : ''}`}>
                <QR />
            </div>
            <div className='flex flex-col h-[400px] w-full px-8'>
                <div className='space-x-3 mx-auto flex flex-row items-center overflow-x-auto'>
                    {options.map((option, index) => (
                        <Button
                            variant="outlined"

                            onClick={() => handleOptionSelect(index)}
                            key={index}
                            sx={{
                                fontFamily: 'Arial',
                                fontSize: '14px',
                                fontWeight: selectedOptionIndex === index ? 'bold' : 'bold',
                                color: selectedOptionIndex === index ? '#ffffff' : 'primary',
                                backgroundColor: selectedOptionIndex === index ? '#007bff' : 'transparent',
                                '&:hover': {
                                    backgroundColor: selectedOptionIndex === index ? '#007bff' : '#f0f0f0',
                                },
                            }}
                        >
                            {option.name}
                        </Button>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={Dowload}
                    >
                        Finish
                    </Button>
                </div>
                <div className='p-4 space-y-4 rounded-md'>
                    <OptionComponent onTabSelect={handleOptionSelect} />
                </div>
            </div>
        </div>
    );
}

export default CustomQr;