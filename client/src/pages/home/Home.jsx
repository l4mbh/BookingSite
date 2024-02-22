import React from "react";

import NavBar from "./NavBar/NavBar";
import Header from "./Header/Header";
import CityList from "./City/CityList";
import Property from "./PropertyType/Property";
import HotelList from "./Hotel/HotelList";
import Subcribe from "./Subcribe/Subcribe";
import Footer from "./Footer/Footer";


const Home = () => {
	return (
		<div>
			<NavBar></NavBar>
			<Header></Header>
			<CityList></CityList>
			<Property></Property>
			<HotelList></HotelList>
			<Subcribe></Subcribe>
			<Footer></Footer>
		</div>
	);
};

export default Home;

