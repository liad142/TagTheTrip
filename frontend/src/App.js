import * as React from 'react';
import {useEffect, useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from "@material-ui/icons";
import './app.css'
import axios from "axios";
import {format} from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";
import Form from "./components/Form";


function App() {
    const myStorage = window.localStorage
    const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'))
    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null)
    const [newPlace, setNewPlace] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [rating, setRating] = useState(0)
    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 46,
        longitude: 17,
        zoom: 4
    });

    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get("/pins");
                setPins(res.data);
            } catch (err) {
                console.log(err, 'err in useEffect getting pins')
            }
        }
        getPins()
    }, [])
    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id)
        setViewport({...viewport, latitude: lat, longitude: long}) //מביאים את כל הVIEWPORT אבל משנה את הLAT ו LONG
    }
    const handleAddClick = (e) => {
        const [long, lat] = e.lngLat;
        setNewPlace({
            lat, long
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPin = {
            username: currentUser,
            title,
            desc,
            rating,
            lat: newPlace.lat,
            long: newPlace.long
        }
        try {
            const res = await axios.post('/pins', newPin);
            setPins([...pins, res.data])
            setNewPlace(null)
        } catch (err) {
            console.log(err, 'error on sending new pin to back end')
        }
    }

    const handleLogOut = () => {
        myStorage.removeItem('user')
        setCurrentUser(null)
    }

    return (
        <div className="App">
            <ReactMapGL
                {...viewport} //מחזיק את כל המאפיינים
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
                onDblClick={handleAddClick}
                transitionDuration={'200'}
            >
                {pins.map(pin => (
                    <>
                        <Marker latitude={pin.lat} longitude={pin.long} offsetLeft={viewport.zoom * 7}
                                offsetTop={viewport.zoom * 3.5}>
                            <Room
                                style={{
                                    fontSize: viewport.zoom * 7,
                                    color: pin.username === currentUser ? 'red' : 'blue',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
                            />
                        </Marker>
                        {pin._id === currentPlaceId && (
                            <Popup
                                latitude={pin.lat}
                                longitude={pin.long}
                                closeButton={true}
                                closeOnClick={false}
                                anchor="top"
                                onClose={() => setCurrentPlaceId(null)}
                            >
                                <div className={'card'}>
                                    <label>Place</label>
                                    <h4 className={'place'}>{pin.title}</h4>
                                    <label>Review</label>
                                    <p className={'desc'}>{pin.desc}</p>
                                    <label>Rating</label>
                                    <div className={'stars'}>
                                        {/*לוקח את המספר וממלא אותו עם הקומפוננטה לפי מס' הכוכבים*/}
                                        {Array(pin.rating).fill(<Star className={'star'}/>)}
                                    </div>
                                    <label>Info</label>
                                    <span className={'username'}>Created By <b>{pin.username}</b></span>
                                    <span className={'date'}>{format(pin.createdAt)}</span>
                                </div>
                            </Popup>
                        )}
                    </>
                ))}

                {newPlace &&
                <Popup
                    latitude={newPlace.lat}
                    longitude={newPlace.long}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="top"
                    onClose={() => setNewPlace(null)}
                >
                    <div>
                        <Form handleSubmit={handleSubmit}
                              setTitle={setTitle} setDesc={setDesc} setRating={setRating}/>
                    </div>

                </Popup>
                }
                {/*אם יש משתמש תראה את כפתור הלוגין,ואם לא מראה את כפתור ההתחברות והרשמה*/}
                {currentUser ?
                    (<button className={'button logout'} onClick={handleLogOut}>Log Out</button>)
                    : (
                        <div className={'buttons'}>
                            <button className={'button login'} onClick={() => setShowLogin(true)}>Login</button>
                            <button className={'button register'} onClick={() => setShowRegister(true)}>Register
                            </button>
                        </div>
                    )}
                {/*&& if its true show register componenet*/}
                {showRegister && <Register setShowRegister={setShowRegister}/>}

                {/*&& if its true show login componenet*/}
                {showLogin &&
                <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}

            </ReactMapGL>
        </div>
    );
}

export default App;
