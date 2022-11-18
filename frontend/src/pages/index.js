import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import { useForm } from "react-hook-form";


function Home() {
    const { register, getValues } = useForm();
    const [cookies, setCookie] = useCookies(['favrouite_list']);
    const [displayedData, setDisplayedData] = useState(null)


    function handleSubmit(event) {
        event.preventDefault();
        let request_data = getValues();
        getWeather(request_data.zip)
    }

    const getWeather = (zip_code) => {
        fetch('/api/get-weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'zip_code': zip_code }) // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then(data => {

                if (data['error'] != null && data['data'] != null)
                    setDisplayedData({ "zip_code": zip_code, data: data['data'] })
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    const handleDelete = (zip_code) => {

        if (cookies.favrouite_list != null) {
            setCookie('favrouite_list', cookies.favrouite_list.filter(data => data.zip_code !== zip_code), { path: '/' });
        }

    }
    const handleSave = (event) => {
        event.preventDefault();
        if (displayedData != null) {
            if (cookies.favrouite_list != null) {
                const is_found = cookies.favrouite_list.find(x => x.zip_code === displayedData['zip_code'])
                if (is_found == null)
                    setCookie('favrouite_list', cookies.favrouite_list.concat([displayedData]), { path: '/' });
            }
            else
                setCookie('favrouite_list', [displayedData], { path: '/' });
        }
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">     <span className="navbar-toggler-icon"></span>     </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">               </li>
                        <li className="nav-item">                </li>
                        <li className="nav-item">                </li>
                    </ul>
                    <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0" _lpchecked="1">
                        <input className="form-control mr-sm-2" type="text" pattern="\d*" maxlength="5" placeholder="Zip Code" aria-label="Zip Code" {...register("zip")} />       <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>      </form>
                </div>
            </nav>
            <footer className="footer">
                <ul className="list-group" >
                    {cookies.favrouite_list && cookies.favrouite_list.length > 0 && cookies.favrouite_list.map((fav, index) => (
                        <li key={`${index}`} className="list-group-item" >
                            <span onClick={() => (getWeather(fav['zip_code']))} style={{ cursor: 'pointer' }} >
                                {fav['data']['name']}, {fav['data']['sys']['country']}
                            </span>
                            <button type="button" className="btn btn-default" style={{ display: "inline", float: "right" }} onClick={() => handleDelete(fav.zip_code)}>X</button></li>
                    ))}
                    {/* <li className="list-group-item">Miami Beach Florida<button type="button" className="btn btn-default" style={{ display: "inline", float: "right" }}>X</button></li>
                    <li className="list-group-item">
                        Austin Texas<button type="button" className="btn btn-default" style={{ display: "inline", float: "right" }}>X</button>
                    </li>
                    <li className="list-group-item">Williamsburg Virginia<button type="button" className="btn btn-default" style={{ display: "inline", float: "right" }}>X</button></li> */}
                </ul>
                <p contenteditable="true" spellcheckker="false">
                    {displayedData != null && <div className="card" style={{ marginTop: "30px" }}>
                        <div className="card" style={{ marginTop: "0px" }}>
                            <div className="card-body" style={{ marginTop: "0px" }}>
                                <h4 className="card-title">
                                    <b>{displayedData['data']['name']}, {displayedData['data']['sys']['country']}</b>

                                </h4>
                                <div className="row" >
                                    <div className="col-sm-4">
                                        <h1>
                                            {Math.round(displayedData['data']['main']['temp'] - 273.15)}°
                                            <h6 >{displayedData['data']['weather']['main']}</h6>
                                        </h1>
                                    </div>
                                    <div className="col-sm-4 col-5">
                                        <h3></h3>
                                    </div>
                                    <div className="col-sm-4">
                                        <h5 >Precipitation 7%</h5>
                                        <h5 >Humidity {displayedData['data']['main']['humidity']}%</h5>
                                        <h5 >Wind {displayedData['data']['wind']['speed']} mph</h5>
                                        <div className="row" >
                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4 col-5"></div>
                                            <div className="col-sm-4"></div>
                                        </div>
                                    </div>
                                </div>
                                <button href="#" className="btn btn-primary" onClick={handleSave}>Add to favourites</button>

                            </div>
                        </div>
                    </div>}
                    © Firstly NodeJS 2021</p>
            </footer>
        </div >
    );
}

export default Home;